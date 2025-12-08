import puppeteer from "puppeteer";
import fs from "fs-extra";
import path from "path";
import { HearthstoneCard } from "@/data/cards/cards";

const OUTPUT_JSON = path.join(__dirname, "../cards.json");

const BASE_URL =
  "https://hearthstone.blizzard.com/ko-kr/cards?set=legacy&viewMode=table";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  console.log("페이지 열기...");
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 60000 });

  await page.waitForSelector(
    "table.CardTableLayout__CardTableView-sc-1si3xqh-1"
  );

  await page.screenshot({ path: "debug.png", fullPage: true });

  console.log("카드 정보 수집 중...");

  const cards = await page.evaluate(() => {
    const rows = document.querySelectorAll(
      "table.CardTableLayout__CardTableView-sc-1si3xqh-1 > tbody > tr"
    );

    const results: HearthstoneCard[] = [];

    rows.forEach((row) => {
      // 카드 이름
      const name = row.querySelector(".card .name")?.textContent?.trim() || "";

      // 마나
      const manaStr = row
        .querySelector(".iconNumeric .manaCost")
        ?.textContent?.trim();
      const mana = manaStr ? parseInt(manaStr) : null;

      // 직업
      let cardClass = "";
      const classIconDiv = row.querySelector(".ClassIconContainer .ClassIcon"); // 가장 안쪽의 ClassIcon div를 선택
      if (classIconDiv) {
        const classList = Array.from(classIconDiv.classList); // 클래스 목록을 배열로 변환
        const classKeyword = classList.find(
          (cls) =>
            ![
              "CircleIcon-fmr8yz-0",
              "ClassIcon-sc-1hgwqgj-0",
              "ClassControl__ItemIcon-jisfzz-1",
              "DtAzA",
              "ClassIcon",
            ].includes(cls)
        );
        if (classKeyword) {
          cardClass = classKeyword;
        }
      }

      // 공격력
      const attackElement = row.querySelector(".iconNumeric .attack");
      const attackStr = attackElement
        ? attackElement.textContent?.trim()
        : null;
      const attack =
        attackStr && attackStr !== "-" ? parseInt(attackStr) : null;

      // 생명력
      const healthElement = row.querySelector(".iconNumeric .health");
      const healthStr = healthElement
        ? healthElement.textContent?.trim()
        : null;
      const health =
        healthStr && healthStr !== "-" ? parseInt(healthStr) : null;

      // 종류, 종족, 속성
      let type = ""; // 종류 (하수인, 주문, 무기, 영웅, 장소)
      let minionType: string[] = []; // 종족 (야수, 용족, 악마...)
      let spellSchool: string[] = []; // 주문 속성 (암흑, 화염, 냉기...)

      const typeElement = row.querySelector(
        "h6.CardTableLayout__TitleText-sc-1si3xqh-5.loMGUg"
      );
      if (typeElement) {
        const typeText = typeElement.textContent?.trim() || "";
        const parts = typeText.split(" - ").map((p) => p.trim());

        // 종류(하수인, 주문, 무기, 영웅, 장소)
        type = parts[0];

        // 하수인인 경우, 종족
        if (type === "하수인" && parts.length > 1) {
          minionType = parts[1].split(",").map((r) => r.trim());
        }
        // 주문인 경우, 속성
        else if (type === "주문" && parts.length > 1) {
          spellSchool = parts[1].split(",").map((s) => s.trim());
        }
      }

      // 등급
      let rarity = "";
      const rarityElement = row.querySelector(
        "h6.CardTableLayout__RarityText-sc-1si3xqh-6"
      );

      if (rarityElement) {
        const rarityText = rarityElement.textContent?.trim() || "";
        if (rarityText === "무료") {
          rarity = "일반"; // "무료" => "일반"
        } else {
          rarity = rarityText;
        }
      }

      // 키워드
      const keywords: string[] = [];
      const keywordElements = row.querySelectorAll(
        "h6.CardTableLayout__KeywordText-sc-1si3xqh-7"
      );

      keywordElements.forEach((element) => {
        const keywordText = element.textContent?.trim();
        if (keywordText) {
          keywords.push(keywordText);
        }
      });

      results.push({
        packs: "고전",
        name,
        mana,
        class: cardClass,
        attack,
        health,
        type,
        rarity,
        keywords: keywords,
        minionType,
        spellSchool,
        imagePath: "",
      });
    });

    return results;
  });

  // JSON 저장
  await fs.writeJson(OUTPUT_JSON, cards, { spaces: 2 });

  await browser.close();
})();
