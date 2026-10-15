import * as React from "react"
import { cleanup, render, screen } from "@testing-library/react"
import { renderToString } from "react-dom/server"
import { afterEach, describe, expect, it } from "vitest"

import {
  Progress,
  ProgressCircle,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "./progress"

afterEach(() => {
  cleanup()
})

function indicator(container: HTMLElement) {
  return container.querySelector<HTMLElement>("[data-slot=progress-indicator]")!
}

function circleIndicator(container: HTMLElement) {
  return container.querySelector<SVGCircleElement>(
    "[data-slot=progress-circle-indicator]"
  )!
}

describe("Progress", () => {
  it("is a progressbar named by its label", () => {
    const { container } = render(
      <Progress value={40}>
        <ProgressLabel>Uploading</ProgressLabel>
        <ProgressValue />
      </Progress>
    )
    const bar = screen.getByRole("progressbar", { name: "Uploading" })
    expect(bar.getAttribute("data-slot")).toBe("progress")
    expect(bar.getAttribute("aria-valuenow")).toBe("40")
    expect(bar.getAttribute("aria-valuetext")).toBe("40%")
    expect(indicator(container).style.width).toBe("40%")
    expect(
      container.querySelector("[data-slot=progress-value]")?.textContent
    ).toBe("40%")
    expect(
      container.querySelectorAll("[data-slot=progress-track]")
    ).toHaveLength(1)
  })

  it("clamps out-of-range and degenerate values", () => {
    const { container, rerender } = render(<Progress value={250} />)
    expect(indicator(container).style.width).toBe("100%")
    expect(screen.getByRole("progressbar").hasAttribute("data-complete")).toBe(
      true
    )

    rerender(<Progress value={-20} />)
    expect(indicator(container).style.width).toBe("0%")

    rerender(<Progress value={5} min={5} max={5} />)
    expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe(
      "5"
    )
  })

  it("maps an inverted range the same way as the bar", () => {
    const { container } = render(<Progress value={50} min={100} max={0} />)
    expect(indicator(container).style.width).toBe("50%")
    const circle = render(<ProgressCircle value={50} min={100} max={0} />)
    expect(
      circle.container
        .querySelector<SVGElement>("[data-slot=progress-circle-svg]")!
        .style.getPropertyValue("--progress")
    ).toBe("50")
  })

  it("snaps instead of shrinking when it becomes indeterminate", () => {
    const { container } = render(<Progress value={null} />)
    expect(indicator(container).className).toMatch(
      /data-indeterminate:transition-none/
    )
  })

  it("is indeterminate for null and non-finite values", () => {
    for (const value of [null, Number.NaN, Number.POSITIVE_INFINITY]) {
      const { container, unmount } = render(<Progress value={value} />)
      const bar = screen.getByRole("progressbar")
      expect(bar.hasAttribute("data-indeterminate")).toBe(true)
      expect(bar.hasAttribute("aria-valuenow")).toBe(false)
      expect(indicator(container).style.width).toBe("")
      unmount()
    }
  })

  it("maps min and max to the fill", () => {
    const { container } = render(<Progress value={15} min={10} max={30} />)
    expect(indicator(container).style.width).toBe("25%")
  })

  it("shares size with the track", () => {
    const { container } = render(<Progress value={10} size="lg" />)
    expect(
      container.querySelector("[data-slot=progress]")?.getAttribute("data-size")
    ).toBe("lg")
    expect(
      container.querySelector("[data-slot=progress-track]")?.className
    ).toMatch(/h-2\.5/)
  })

  it("formats with a fixed default locale so SSR matches the client", () => {
    const html = renderToString(
      <Progress value={1234.5} max={5000} format={{ maximumFractionDigits: 1 }}>
        <ProgressValue />
      </Progress>
    )
    expect(html).toContain("1,234.5")
  })

  it("respects a caller locale", () => {
    const { container } = render(
      <Progress value={50} locale="de-DE">
        <ProgressValue />
      </Progress>
    )
    expect(
      container.querySelector("[data-slot=progress-value]")?.textContent
    ).toMatch(/^50\s%$/)
  })

  it("accepts function class names", () => {
    const { container } = render(
      <Progress
        value={100}
        className={(state) => (state.status === "complete" ? "done" : "")}
      />
    )
    expect(container.querySelector("[data-slot=progress]")?.className).toMatch(
      /\bdone\b/
    )
  })

  it("throws a clear error outside Progress", () => {
    expect(() =>
      render(
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      )
    ).toThrow()
    expect(() => render(<ProgressValue />)).toThrow(
      "ProgressValue must be used within <Progress>."
    )
  })
})

describe("Progress variants", () => {
  it("colors only the fill", () => {
    const { container } = render(<Progress value={50} variant="destructive" />)
    expect(
      container
        .querySelector("[data-slot=progress]")
        ?.getAttribute("data-variant")
    ).toBe("destructive")
    expect(indicator(container).className).toMatch(/\bbg-destructive\b/)
    expect(indicator(container).className).not.toMatch(/\bbg-primary\b/)
    expect(
      container.querySelector("[data-slot=progress-track]")?.className
    ).not.toMatch(/destructive/)
  })

  it("colors the ring stroke", () => {
    const { container } = render(
      <ProgressCircle value={50} variant="success" />
    )
    const ring = circleIndicator(container).getAttribute("class")!
    expect(ring).toMatch(/\bstroke-success\b/)
    expect(ring).not.toMatch(/\bstroke-primary\b/)
  })
})

describe("ProgressCircle", () => {
  it("is a progressbar drawing the percent as a dash", () => {
    const { container } = render(
      <ProgressCircle value={30} max={60} aria-label="Syncing" />
    )
    const circle = screen.getByRole("progressbar", { name: "Syncing" })
    expect(circle.getAttribute("data-slot")).toBe("progress-circle")
    expect(circle.getAttribute("aria-valuenow")).toBe("30")
    const svg = container.querySelector<SVGElement>(
      "[data-slot=progress-circle-svg]"
    )!
    expect(svg.style.getPropertyValue("--progress")).toBe("50")
    expect(svg.getAttribute("aria-hidden")).toBe("true")
  })

  it("hides the round cap at zero", () => {
    const { container, rerender } = render(<ProgressCircle value={0} />)
    expect(circleIndicator(container).getAttribute("class")).toMatch(
      /opacity-0/
    )
    rerender(<ProgressCircle value={1} />)
    expect(circleIndicator(container).getAttribute("class")).not.toMatch(
      /opacity-0/
    )
  })

  it("spins an arc when indeterminate", () => {
    const { container } = render(<ProgressCircle value={null} />)
    expect(circleIndicator(container).getAttribute("class")).toMatch(
      /animate-spinner-rotate/
    )
  })

  it("renders the value in the middle", () => {
    const { container } = render(
      <ProgressCircle value={72} size="xl">
        <ProgressValue />
      </ProgressCircle>
    )
    const value = container.querySelector("[data-slot=progress-value]")!
    expect(value.textContent).toBe("72%")
    expect(value.className).not.toMatch(/ms-auto/)
    expect(
      container
        .querySelector("[data-slot=progress-circle]")
        ?.getAttribute("data-size")
    ).toBe("xl")
  })

  it("falls back to the default size for null", () => {
    const { container } = render(<ProgressCircle value={5} size={null} />)
    expect(
      container
        .querySelector("[data-slot=progress-circle]")
        ?.getAttribute("data-size")
    ).toBe("default")
  })
})

describe("Progress element identity", () => {
  it("keeps the indicator element across value updates", () => {
    const { container, rerender } = render(<Progress value={10} />)
    const first = indicator(container)
    rerender(<Progress value={80} />)
    expect(indicator(container)).toBe(first)
    expect(first.style.width).toBe("80%")
    rerender(<Progress value={null} />)
    expect(indicator(container)).toBe(first)
    expect(React.isValidElement(<Progress value={1} />)).toBe(true)
  })
})

describe("Progress segments", () => {
  function segments(container: HTMLElement) {
    return [
      ...container.querySelectorAll<HTMLElement>("[data-slot=progress-segment]"),
    ]
  }

  it("splits the fill into parts that add up to the value", () => {
    const { container } = render(
      <Progress
        max={40}
        segments={[
          { value: 20, variant: "success", label: "passed" },
          { value: 4, variant: "destructive", label: "failed" },
          { value: 0, variant: "warning", label: "skipped" },
        ]}
        aria-label="Tests"
      />
    )
    const bar = screen.getByRole("progressbar", { name: "Tests" })
    expect(bar.getAttribute("aria-valuenow")).toBe("24")
    expect(bar.getAttribute("aria-valuetext")).toBe("60% (20 passed, 4 failed)")
    expect(container.querySelector("[data-slot=progress-indicator]")).toBe(null)
    const parts = segments(container)
    expect(
      parts.map((part) => part.style.getPropertyValue("--progress-segment"))
    ).toEqual(["50%", "10%", "0%"])
    expect(parts.map((part) => part.getAttribute("data-variant"))).toEqual([
      "success",
      "destructive",
      "warning",
    ])
    expect(parts.map((part) => part.hasAttribute("data-gap"))).toEqual([
      false,
      true,
      false,
    ])
  })

  it("skips the gap before the first filled part and ignores bad values", () => {
    const { container } = render(
      <Progress
        segments={[
          { value: 0 },
          { value: Number.NaN },
          { value: 30, variant: "success" },
          { value: -5 },
        ]}
      />
    )
    expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe(
      "30"
    )
    expect(segments(container).map((part) => part.hasAttribute("data-gap"))).toEqual(
      [false, false, false, false]
    )
  })

  it("keeps a caller's aria value text", () => {
    render(
      <Progress
        segments={[{ value: 10, label: "passed" }]}
        getAriaValueText={() => "Ten done"}
      />
    )
    expect(
      screen.getByRole("progressbar").getAttribute("aria-valuetext")
    ).toBe("Ten done")
  })
})

