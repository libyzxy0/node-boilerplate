import { expect, test } from "vitest";
import { API_VERSION } from "../../src/utils/version";

test("Check API version", async () => {
  expect(API_VERSION).toBeDefined();
});
