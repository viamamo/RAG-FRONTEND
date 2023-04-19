import {MOCK_LABEL} from "../contants";

export function getMockLabel(mockType: string): string {
  for (let [key, value] of Object.entries(MOCK_LABEL)) {
    if (key === mockType) {
      return value
    }
  }
  return ""
}