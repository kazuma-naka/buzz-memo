import { renderHook, waitFor } from "@testing-library/react";
import useServiceDescription  from "../../hooks/useServiceDescription";

describe("useServiceDescription", () => {
  it("初期データでテスト", async () => {
    const { result } = renderHook(() => useServiceDescription());
    await waitFor(() => {
      expect(result.current).toEqual([
        { id: 1, imageUrl: "/static/globe.png", content: "Service 1の説明" },
        { id: 2, imageUrl: "/static/next.png", content: "Service 2の説明" },
        { id: 3, imageUrl: "/static/vercel.png", content: "Service 3の説明" },
      ]);
    });
  });
});
