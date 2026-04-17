import { describe, expect, it, vi, beforeEach } from "vitest";
import type { TrpcContext } from "./_core/context";

// Mock the Forge notification layer BEFORE importing anything that pulls it in.
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

import { appRouter } from "./routers";
import { notifyOwner } from "./_core/notification";

function unauthenticatedContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

const mockedNotifyOwner = notifyOwner as unknown as ReturnType<typeof vi.fn>;

describe("contact router", () => {
  beforeEach(() => {
    mockedNotifyOwner.mockClear();
    mockedNotifyOwner.mockResolvedValue(true);
  });

  describe("contact.send", () => {
    it("accepts a well-formed message and dispatches notifyOwner", async () => {
      const caller = appRouter.createCaller(unauthenticatedContext());
      const result = await caller.contact.send({
        name: "Fulano da Silva",
        email: "fulano@example.com",
        phone: "11999999999",
        company: "Acme Corp",
        subject: "Consultoria",
        message: "Gostaria de conversar sobre transformação.",
      });

      expect(result).toEqual({ success: true });
      expect(mockedNotifyOwner).toHaveBeenCalledTimes(1);

      const payload = mockedNotifyOwner.mock.calls[0][0];
      expect(payload.title).toContain("[Contato site]");
      expect(payload.title).toContain("Fulano da Silva");
      expect(payload.content).toContain("fulano@example.com");
      expect(payload.content).toContain("Acme Corp");
      expect(payload.content).toContain("fsannino@clbz.com.br");
    });

    it("rejects invalid email via Zod", async () => {
      const caller = appRouter.createCaller(unauthenticatedContext());
      await expect(
        caller.contact.send({
          name: "Fulano",
          email: "not-an-email",
          phone: "",
          company: "",
          subject: "Outro",
          message: "mensagem de teste longa o suficiente",
        }),
      ).rejects.toThrow();
      expect(mockedNotifyOwner).not.toHaveBeenCalled();
    });

    it("rejects too-short message via Zod", async () => {
      const caller = appRouter.createCaller(unauthenticatedContext());
      await expect(
        caller.contact.send({
          name: "Fulano",
          email: "fulano@example.com",
          phone: "",
          company: "",
          subject: "Outro",
          message: "curto",
        }),
      ).rejects.toThrow();
      expect(mockedNotifyOwner).not.toHaveBeenCalled();
    });

    it("returns success: false when the upstream Forge call fails softly", async () => {
      mockedNotifyOwner.mockResolvedValueOnce(false);
      const caller = appRouter.createCaller(unauthenticatedContext());
      const result = await caller.contact.send({
        name: "Fulano",
        email: "fulano@example.com",
        phone: "",
        company: "",
        subject: "Outro",
        message: "mensagem válida o suficiente para passar o mínimo.",
      });
      expect(result).toEqual({ success: false });
    });

    it("swallows upstream throws so the form never explodes", async () => {
      mockedNotifyOwner.mockRejectedValueOnce(new Error("boom"));
      const caller = appRouter.createCaller(unauthenticatedContext());
      const result = await caller.contact.send({
        name: "Fulano",
        email: "fulano@example.com",
        phone: "",
        company: "",
        subject: "Outro",
        message: "mensagem de tamanho suficiente para passar a validação.",
      });
      expect(result).toEqual({ success: false });
    });
  });

  describe("contact.subscribeNewsletter", () => {
    it("registers a valid e-mail and defaults the source", async () => {
      const caller = appRouter.createCaller(unauthenticatedContext());
      const result = await caller.contact.subscribeNewsletter({
        email: "lead@example.com",
      });
      expect(result).toEqual({ success: true });
      const payload = mockedNotifyOwner.mock.calls[0][0];
      expect(payload.title).toContain("Newsletter Change Pulse");
      expect(payload.content).toContain("lead@example.com");
    });
  });

  describe("contact.requestResource", () => {
    it("routes resource request to the owner inbox", async () => {
      const caller = appRouter.createCaller(unauthenticatedContext());
      const result = await caller.contact.requestResource({
        email: "reader@example.com",
        resourceSlug: "checklist-prontidao",
        resourceTitle: "Checklist de Prontidão",
      });
      expect(result).toEqual({ success: true });
      const payload = mockedNotifyOwner.mock.calls[0][0];
      expect(payload.title).toContain("Download recurso");
      expect(payload.content).toContain("checklist-prontidao");
      expect(payload.content).toContain("reader@example.com");
    });
  });
});
