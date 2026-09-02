import { describe, expect, it } from "vitest";
import { prepareReportForDisplay } from "../../src/utils/reportDisplay";
import type { InvestigationReport } from "../../src/types/report";

const placeholderReport: InvestigationReport = {
  report_id: "rpt-placeholder",
  event_id: "evt-placeholder",
  title: "string",
  summary: "string",
  sections: [
    {
      key: "overview",
      title: "事件概述",
      content:
        "markdown string\ndecision_brief: 事件类型 data_exfiltration；严重级别 high；风险分 81。",
      data: { decision_brief: "事件类型 data_exfiltration；严重级别 high；风险分 81。" },
    },
    {
      key: "severity_level",
      title: "严重级别",
      content: "markdown string",
      data: {},
    },
    {
      key: "involved_accounts",
      title: "涉及账号",
      content: "markdown string",
      data: {},
    },
  ],
  final_verdict: "confirmed_threat",
  risk_score: 81,
  severity: "high",
  version: 1,
  generated_by: "llm",
  generated_at: null,
  updated_at: null,
};

describe("prepareReportForDisplay", () => {
  it("strips schema echo and rebuilds operator-facing chapters", () => {
    const display = prepareReportForDisplay(placeholderReport, {
      eventTitle: "Finance endpoint suspected data exfiltration",
      entities: {
        accounts: [
          {
            entity_id: "acct-1",
            entity_type: "account",
            username: "zhangsan",
          },
        ],
        hosts: [],
        ips: [],
        domains: [],
        processes: [],
        files: [],
      },
    });

    expect(display.title).toBe("Finance endpoint suspected data exfiltration");
    expect(display.summary).toBe("");
    expect(display.sections[0].content).not.toMatch(/markdown string/i);
    expect(display.sections[0].content).toContain("研判摘要");
    expect(display.sections[1].content).toBe("高");
    expect(display.sections[2].content).toContain("zhangsan");
  });
});
