import test from "node:test";
import assert from "node:assert/strict";
import { parseAmazonUrl } from "./amazon";
import { isBuyable, isReservable } from "./payment-config";

test("aceita links da Amazon e vazio", () => {
  for (const u of ["https://www.amazon.com.br/dp/B0HHWMTPR6", " https://amzn.to/abc "]) assert.equal(parseAmazonUrl(u).ok, true);
  for (const v of ["", "  ", null, undefined]) assert.deepEqual(parseAmazonUrl(v), { ok: true, url: null });
});

test("recusa o resto", () => {
  for (const u of ["javascript:alert(1)", "http://www.amazon.com.br/dp/X", "https://amazon.com.br.evil.com/", "https://amazon.com@evil.com/", "abc", 3])
    assert.equal(parseAmazonUrl(u).ok, false, String(u));
});

test("em breve reserva sem preço e nunca vende", () => {
  const w = { saleEnabled: false, price: null, status: "COMING_SOON" };
  assert.equal(isReservable(w), true);
  assert.equal(isBuyable({ ...w, saleEnabled: true, price: 10 }), false);
});
