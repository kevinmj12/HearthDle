export interface HearthstoneCard {
  packs: string;
  name: string;
  class: string;
  mana: number | null;
  attack: number | null;
  health: number | null;
  type: string;
  rarity: string;
  keywords: string[];
  minionType: string[];
  spellSchool: string[];
  imagePath: string;
}

// type HearthstoneClass =
//   | "dk"
//   | "dh"
//   | "druid"
//   | "hunter"
//   | "mage"
//   | "paladin"
//   | "priest"
//   | "rogue"
//   | "shaman"
//   | "warlock"
//   | "warrior"
//   | "neutral";

// type HearthstoneType = "minion" | "spell" | "weapon" | "hero" | "location";

// type HearthstoneRarity = "common" | "rare" | "epic" | "legendary";

// type HearthstoneMinionType =
//   | "beast"
//   | "demon"
//   | "draenei"
//   | "dragon"
//   | "elemental"
//   | "mech"
//   | "murloc"
//   | "naga"
//   | "pirate"
//   | "quilboar"
//   | "totem"
//   | "undead";

// type HearthstoneSpellSchool =
//   | "arcane"
//   | "fire"
//   | "frost"
//   | "nature"
//   | "holy"
//   | "shadow"
//   | "fel";

// type HearthstoneKeyword =
//   | "adapt" // 적응
//   | "battlecry" // 전함
//   | "charge" // 돌진
//   | "colossal" // 거수
//   | "combo" // 연계
//   | "corpse" // 시체
//   | "corrupt" // 타락
//   | "counter" // 차단 (마차, 이의있음, 오카니)
//   | "darkgift" // 어둠의선물
//   | "deathrattle" // 죽메
//   | "discover" // 발견
//   | "divineshield" // 천보
//   | "dredge" // 인양
//   | "echo" // 잔상
//   | "elusive" // 모면
//   | "excavate" // 발굴
//   | "finale" //피날레
//   | "forge" // 제련
//   | "freeze" // 빙결
//   | "frenzy" // 격노
//   | "honorablekill" // 명격
//   | "imbue" // 연마
//   | "immune" // 면역
//   | "infuse" // 주입
//   | "inspire" // 격려
//   | "invoke" // 기원
//   | "kindred" // 유사
//   | "lackey" // 졸개
//   | "lifesteal" // 생흡
//   | "magnetic" // 합체
//   | "manathirst" // 마나갈증
//   | "mega-windfury" // 광풍
//   | "miniaturize" // 미니미
//   | "naturespelldamage" // 자연주공(브루칸 1장)
//   | "outcast" // 추방자
//   | "overheal" // 초과치유
//   | "overkill" // 압살
//   | "overload" // 과부하
//   | "poisonous" // 독성
//   | "quest" // 퀘스트
//   | "questline" // 퀘스트전개(역병뿌리탬신)
//   | "quickdraw" // 빨리뽑기
//   | "reborn" // 환생
//   | "recruit" // 소집
//   | "rush" // 속공
//   | "secret" // 비밀
//   | "sidequest" // 부가퀘스트
//   | "silence" // 침묵
//   | "spareparts" // 예비부품
//   | "spelldamage" // 주공
//   | "spellburst" // 주문폭주
//   | "starship" // 우주선
//   | "startofgame" // 개전
//   | "stealth" // 은신
//   | "taunt" // 도발
//   | "temporary" // 일시적
//   | "titan" // 티탄
//   | "tradeable" // 교환성
//   | "twinspell" // 이중 주문
//   | "windfury"; // 질풍
