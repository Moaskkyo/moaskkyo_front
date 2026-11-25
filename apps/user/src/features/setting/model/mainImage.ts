export const MAIN_IMAGE_TYPE = "image/png";
export const MAIN_IMAGE_MAX_BYTES = 5 * 1024 * 1024;

export interface MainImageError {
  title: string;
  hint: string;
}

export const NOT_PNG_ERROR: MainImageError = {
  title: "PNG 파일이 아니라서 올리지 못했어요",
  hint: "기존 이미지를 유지했어요",
};

export const TOO_LARGE_ERROR: MainImageError = {
  title: "이미지 용량이 너무 커요",
  hint: "더 작은 이미지를 올려 주세요",
};
