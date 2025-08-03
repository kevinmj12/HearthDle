import puppeteer from "puppeteer";
import fs from "fs-extra";
import path from "path";
import { HearthstoneCard } from "@/cards";

const OUTPUT_JSON = path.join(__dirname, "../cards.json");

// 이미지 URL을 가져올 "카드 보기" 모드의 URL
const BASE_URL_CARD_VIEW =
  "https://hearthstone.blizzard.com/ko-kr/cards?set=legacy";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  console.log("기존 카드 데이터 로드 중...");
  let existingCards: HearthstoneCard[] = [];
  try {
    existingCards = await fs.readJson(OUTPUT_JSON);
    console.log(`기존 카드 ${existingCards.length}개 로드 완료.`);
  } catch (err) {
    const error = err as Error;
    console.error(
      `기존 카드 데이터 로드 실패 (${OUTPUT_JSON}):`,
      error.message
    );
    // 파일이 없으면 빈 배열로 시작하거나, 에러를 던질 수 있습니다.
    // 여기서는 빈 배열로 시작하여 새로운 데이터로 채우도록 처리합니다.
    existingCards = [];
  }

  console.log("카드 보기 페이지 열기...");
  try {
    await page.goto(BASE_URL_CARD_VIEW, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    console.log("카드 보기 페이지 로드 완료 (domcontentloaded).");

    await page.waitForSelector(".CardGalleryType__ParchmentMask-yewhpv-0");

    await page.screenshot({ path: "debug_card_view_full.png", fullPage: true });

    console.log("이미지 URL 수집 중...");

    const imageUrls: { [key: string]: string } = await page.evaluate(() => {
      const images = document.querySelectorAll(
        "#MainCardGrid img.CardLayout__CardImage-c9pp6v-5"
      );
      const urls: { [key: string]: string } = {};
      images.forEach((img) => {
        const name = img.getAttribute("alt"); // alt 속성에서 카드 이름을 가져옵니다.
        const src = img.getAttribute("src"); // src 속성에서 이미지 URL을 가져옵니다.
        if (name && src) {
          urls[name.trim()] = src; // 카드 이름(trimming)을 키로 사용하여 URL 저장
        }
      });
      return urls;
    });

    console.log(`수집된 이미지 URL 개수: ${Object.keys(imageUrls).length}`);

    // 기존 카드 데이터에 이미지 URL 매핑
    console.log("기존 데이터에 이미지 URL 업데이트 중...");
    const updatedCards = existingCards.map((card) => {
      const imageUrl = imageUrls[card.name.trim()]; // 저장된 이름으로 URL을 찾습니다.
      if (imageUrl) {
        return { ...card, imagePath: imageUrl };
      }
      return { ...card, imagePath: "" }; // 이미지가 없으면 빈 문자열로 처리
    });

    // 업데이트된 데이터 저장
    await fs.writeJson(OUTPUT_JSON, updatedCards, { spaces: 2 });
    console.log(
      `카드 정보가 ${OUTPUT_JSON}에 이미지 URL과 함께 업데이트되었습니다.`
    );
  } catch (error) {
    console.error("오류 발생:", error);
  } finally {
    await browser.close();
    console.log("브라우저 종료.");
  }
})();
