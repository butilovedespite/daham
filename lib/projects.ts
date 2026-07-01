export type Category =
  | "주거"
  | "상업"
  | "공장, 연구소"
  | "공공"
  | "교회"
  | "계획";

export const FILTER_CATEGORIES: Category[] = [
  "주거",
  "상업",
  "공장, 연구소",
  "공공",
  "교회",
  "계획",
];

export const CATEGORY_LABELS: Record<Category, string> = {
  주거: "주거",
  상업: "상업",
  "공장, 연구소": "공장/연구소",
  공공: "공공",
  교회: "교회",
  계획: "계획",
};

export type Project = {
  id: string;
  code: string;
  category: Category;
  title: string;
  image: string;
  year?: string;
  gridColumn?: number;
  imageScale?: number;
  /** ALL view rows (overrides imageScale when sequential). */
  allViewImageScale?: number;
  detailImageLabels?: string[];
};

export function sortProjectsByYearDesc(projects: Project[]): Project[] {
  return [...projects]
    .sort((a, b) => {
      const yearDiff = Number(b.year ?? 0) - Number(a.year ?? 0);
      if (yearDiff !== 0) {
        return yearDiff;
      }

      return a.title.localeCompare(b.title, "ko");
    })
    .map((project, index) => ({
      ...project,
      gridColumn: (index % 3) + 1,
    }));
}

const RESIDENTIAL_PROJECTS = sortProjectsByYearDesc([
  {
    id: "residential-4",
    code: "R01",
    category: "주거",
    title: "양평주택",
    image: "/주거/양평주택.jpg",
    year: "2013",
    gridColumn: 1,
  },
  {
    id: "residential-1",
    code: "R02",
    category: "주거",
    title: "1-27-1",
    image: "/주거/1-27-1.jpg",
    year: "2012",
    gridColumn: 2,
  },
  {
    id: "residential-2",
    code: "R05",
    category: "주거",
    title: "2-6-7",
    image: "/주거/2-6-7.JPG",
    year: "2013",
    gridColumn: 3,
    imageScale: 1.2,
  },
  {
    id: "residential-6",
    code: "R06",
    category: "주거",
    title: "죽전동 공동주택",
    image: "/주거/죽전동 공동주택.jpg",
    year: "2011",
    gridColumn: 1,
    imageScale: 0.8,
  },
  {
    id: "residential-3",
    code: "R04",
    category: "주거",
    title: "5-12-2",
    image: "/주거/5-12-2.jpg",
    year: "2012",
    gridColumn: 2,
  },
  {
    id: "residential-5",
    code: "R07",
    category: "주거",
    title: "이천다가구 단지",
    image: "/주거/이천다가구 단지.jpg",
    year: "2016",
    gridColumn: 3,
  },
  {
    id: "residential-9",
    code: "R09",
    category: "주거",
    title: "5-8-5",
    image: "/주거/0630/5-8-5/5-8-5.jpg",
    year: "2013",
    gridColumn: 1,
  },
  {
    id: "residential-10",
    code: "R10",
    category: "주거",
    title: "능동 도시형 공동주택",
    image: "/주거/0630/능동 도시형 공동주택.jpg",
    year: "2014",
    gridColumn: 2,
  },
  {
    id: "residential-11",
    code: "R11",
    category: "주거",
    title: "이천도자예술마을",
    image: "/주거/0630/이천도자예술마을/이천도자예술마을.jpg",
    year: "2016",
    gridColumn: 3,
  },
  {
    id: "residential-12",
    code: "R12",
    category: "주거",
    title: "성남고등지구 2-1-13",
    image: "/주거/0630/성남고등지구 2-1-13/성남고등지구 2-1-13.jpg",
    year: "2019",
    gridColumn: 1,
  },
]);

const COMMERCIAL_PROJECTS = sortProjectsByYearDesc([
  {
    id: "commercial-1",
    code: "C01",
    category: "상업",
    title: "2-2-5",
    image: "/상업/2-2-5.jpg",
    year: "2015",
    gridColumn: 1,
  },
  {
    id: "commercial-2",
    code: "C02",
    category: "상업",
    title: "하양공설시장",
    image: "/상업/하양공설시장.jpg",
    year: "2009",
    gridColumn: 2,
  },
  {
    id: "commercial-4",
    code: "C04",
    category: "상업",
    title: "희가빌딩",
    image: "/상업/0630/희가빌딩/희가빌딩.jpg",
    year: "2025",
    gridColumn: 1,
    imageScale: 2 / 3,
  },
]);

const FACTORY_RESEARCH_PROJECTS = sortProjectsByYearDesc([
  {
    id: "factory-1",
    code: "F01",
    category: "공장, 연구소",
    title: "(주)비비테크",
    image: "/공장, 연구소/(주)비비테크.jpg",
    year: "2008",
    gridColumn: 1,
  },
  {
    id: "factory-3",
    code: "F03",
    category: "공장, 연구소",
    title: "bint융합장비개발연구동",
    image: "/공장, 연구소/bint융합장비개발연구동.jpg",
    year: "2010",
    gridColumn: 3,
    imageScale: 1.5,
  },
  {
    id: "factory-4",
    code: "F04",
    category: "공장, 연구소",
    title: "가스하이드레이트 특수저장설비",
    image: "/공장, 연구소/가스하이드레이트 특수저장설비.jpg",
    year: "2007",
    gridColumn: 1,
  },
]);

const PUBLIC_PROJECTS = sortProjectsByYearDesc([
  {
    id: "public-1",
    code: "P01",
    category: "공공",
    title: "갈곳동 어린이집",
    image: "/공공/갈곳동 어린이집.jpg",
    year: "2013",
    gridColumn: 1,
    detailImageLabels: ["1. 변경 전", "2. 변경 후"],
  },
  {
    id: "public-2",
    code: "P02",
    category: "공공",
    title: "강하면 다목적복지회관",
    image: "/공공/강하면 다목적복지회관.jpg",
    year: "2010",
    gridColumn: 2,
    imageScale: 1.3,
  },
  {
    id: "public-3",
    code: "P03",
    category: "공공",
    title: "광교주민공동시설",
    image: "/공공/광교주민공동시설.jpg",
    year: "2015",
    gridColumn: 3,
  },
  {
    id: "public-4",
    code: "P04",
    category: "공공",
    title: "광적도서관",
    image: "/공공/0630/광적도서관/광적도서관.jpg",
    year: "2015",
    gridColumn: 1,
    allViewImageScale: 1.5,
  },
  {
    id: "public-5",
    code: "P05",
    category: "공공",
    title: "성안중학교 체육관",
    image: "/공공/성안중학교 체육관.jpg",
    year: "2007",
    gridColumn: 2,
  },
  {
    id: "public-7",
    code: "P07",
    category: "공공",
    title: "대한적십자사",
    image: "/공공/0630/대한적십자사/대한적십자사.jpg",
    year: "2016",
    gridColumn: 1,
    allViewImageScale: 1.5,
  },
  {
    id: "public-8",
    code: "P08",
    category: "공공",
    title: "동주염전",
    image: "/공공/0630/동주염전/동주염전.jpg",
    year: "2020",
    gridColumn: 2,
  },
  {
    id: "public-9",
    code: "P09",
    category: "공공",
    title: "설악다문화종합복지관",
    image: "/공공/0630/설악다문화종합복지관/설악다문화종합복지관.jpg",
    year: "2019",
    gridColumn: 3,
  },
  {
    id: "public-10",
    code: "P10",
    category: "공공",
    title: "여주시공공산후조리원",
    image: "/공공/0630/여주시공공산후조리원/여주시공공산후조리원.jpg",
    year: "2017",
    gridColumn: 3,
    imageScale: 1.5,
  },
  {
    id: "public-11",
    code: "P11",
    category: "공공",
    title: "이천무형문화재전수교육관",
    image: "/공공/0630/이천무형문화재전수교육관/이천무형문화재전수교육관.jpg",
    year: "2019",
    gridColumn: 1,
    imageScale: 1.2,
  },
  {
    id: "public-12",
    code: "P12",
    category: "공공",
    title: "청북파출소",
    image: "/공공/0630/청북파출소/청북파출소.jpg",
    year: "2021",
    gridColumn: 2,
    imageScale: 1.35,
  },
  {
    id: "public-13",
    code: "P13",
    category: "공공",
    title: "평택로컬푸드",
    image: "/공공/0630/평택로컬푸드/평택로컬푸드.jpg",
    year: "2018",
    gridColumn: 1,
    allViewImageScale: 1.5,
  },
  {
    id: "public-14",
    code: "P14",
    category: "공공",
    title: "화성행궁 화장실",
    image: "/공공/0630/화성행궁 화장실.jpg",
    year: "2025",
    gridColumn: 2,
  },
]);

const PLANNING_PROJECTS = sortProjectsByYearDesc([
  {
    id: "planning-1",
    code: "M01",
    category: "계획",
    title: "금촌1동 주민센터 및 도서관",
    image: "/계획/금촌1동 주민센터 및 도서관.jpg",
    year: "2010",
    gridColumn: 1,
  },
  {
    id: "planning-2",
    code: "M02",
    category: "계획",
    title: "금호동 주민센터",
    image: "/계획/금호동 주민센터.jpg",
    year: "2009",
    gridColumn: 2,
  },
  {
    id: "planning-3",
    code: "M03",
    category: "계획",
    title: "진안동 주민센터",
    image: "/계획/진안동 주민센터.jpg",
    year: "2008",
    gridColumn: 3,
  },
  {
    id: "planning-4",
    code: "M04",
    category: "계획",
    title: "해양시료도서관",
    image: "/계획/해양시료도서관.jpg",
    year: "2009",
    gridColumn: 1,
  },
  {
    id: "planning-5",
    code: "M05",
    category: "계획",
    title: "환경성질환(아토피)치유센터",
    image: "/계획/환경성질환(아토피)치유센터.jpg",
    year: "2011",
    gridColumn: 2,
  },
  {
    id: "planning-6",
    code: "M06",
    category: "계획",
    title: "향남주택",
    image: "/주거/향남주택.jpg",
    year: "2010",
    gridColumn: 3,
  },
  {
    id: "planning-7",
    code: "M07",
    category: "계획",
    title: "광교근생",
    image: "/상업/0630/광교근생.jpg",
    year: "2015",
    gridColumn: 1,
  },
  {
    id: "planning-8",
    code: "M08",
    category: "계획",
    title: "ANI수원공장",
    image: "/공장, 연구소/ANI수원공장.jpg",
    year: "2012",
    gridColumn: 2,
  },
]);

const CHURCH_PROJECTS = sortProjectsByYearDesc([
  {
    id: "church-1",
    code: "H01",
    category: "교회",
    title: "동서 전원교회",
    image: "/교회/동서 전원교회.jpg",
    year: "2004",
    gridColumn: 1,
  },
  {
    id: "church-2",
    code: "H02",
    category: "교회",
    title: "비젼교회",
    image: "/교회/비젼교회.jpg",
    year: "2001",
    gridColumn: 2,
  },
  {
    id: "church-3",
    code: "H03",
    category: "교회",
    title: "사월교회",
    image: "/교회/사월교회.jpg",
    year: "2007",
    gridColumn: 3,
  },
]);

export const PROJECTS: Project[] = [
  ...RESIDENTIAL_PROJECTS,
  ...COMMERCIAL_PROJECTS,
  ...FACTORY_RESEARCH_PROJECTS,
  ...PUBLIC_PROJECTS,
  ...CHURCH_PROJECTS,
  ...PLANNING_PROJECTS,
];
