import { describe, expect, it } from "vitest";
import { mailLink, gmailLink } from "./contact";

describe("Email enquiries", () => {
  it("addresses mail app enquiries to the supplied company email with the subject and message", () => {
    const link = mailLink("Investor enquiry", "Name: Asha\nMessage: Gold project");
    expect(link.split("?")[0]).toBe("mailto:clintonmsety@gmail.com");
    const query = new URLSearchParams(link.split("?")[1]);
    expect(query.get("subject")).toBe("Investor enquiry");
    expect(query.get("body")).toBe("Name: Asha\nMessage: Gold project");
  });
  it("addresses Gmail enquiries to the same email with the complete project message", () => {
    const link = new URL(gmailLink("Mining submission", "Mradi: Dhahabu & shaba"));
    expect(link.searchParams.get("to")).toBe("clintonmsety@gmail.com");
    expect(link.searchParams.get("su")).toBe("Mining submission");
    expect(link.searchParams.get("body")).toBe("Mradi: Dhahabu & shaba");
  });
});