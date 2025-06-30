"use client";

import * as React from "react";
import {
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "./index";

import { Input } from "../input";
import { Button } from "../button";

// Hook to detect screen size
function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}

export function PaginationBasic() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = 10;
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Show fewer pages on mobile
  const visiblePages = isMobile ? 3 : 5;
  const pages = Array.from(
    { length: Math.min(visiblePages, totalPages) },
    (_, i) => i + 1,
  );

  return (
    <Pagination className="flex-wrap">
      <PaginationPrevious
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        size={isMobile ? "sm" : "default"}
      >
        {isMobile ? "Prev" : "Previous"}
      </PaginationPrevious>
      {pages.map((page) => (
        <PaginationItem
          key={page}
          isActive={page === currentPage}
          onClick={() => setCurrentPage(page)}
          size={isMobile ? "sm" : "default"}
        >
          {page}
        </PaginationItem>
      ))}
      {totalPages > visiblePages && <PaginationEllipsis />}
      {totalPages > visiblePages && (
        <PaginationItem
          isActive={currentPage === totalPages}
          onClick={() => setCurrentPage(totalPages)}
          size={isMobile ? "sm" : "default"}
        >
          {totalPages}
        </PaginationItem>
      )}
      <PaginationNext
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        size={isMobile ? "sm" : "default"}
      >
        {isMobile ? "Next" : "Next"}
      </PaginationNext>
    </Pagination>
  );
}

export function PaginationWithEllipsis() {
  const [currentPage, setCurrentPage] = React.useState(5);
  const totalPages = 20;
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 768px)");
  const getVisiblePages = () => {
    // Adjust delta based on screen size
    const delta = isMobile ? 1 : isTablet ? 1 : 2;
    const rangeWithDots = [];

    // Special case: if total pages <= 7, show all pages
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    rangeWithDots.push(1);

    // Calculate the range around current page
    let startPage = Math.max(2, currentPage - delta);
    let endPage = Math.min(totalPages - 1, currentPage + delta);

    // Ensure current page is ALWAYS included in the range
    if (currentPage === 1) {
      // Current page is first page, extend range to the right
      endPage = Math.min(totalPages - 1, 1 + delta * 2);
    } else if (currentPage === totalPages) {
      // Current page is last page, extend range to the left
      startPage = Math.max(2, totalPages - delta * 2);
    } else {
      // Current page is in the middle, ensure it's in the range
      startPage = Math.max(2, Math.min(startPage, currentPage));
      endPage = Math.min(totalPages - 1, Math.max(endPage, currentPage));
    }

    // Add ellipsis after first page if there's a gap
    if (startPage > 2) {
      rangeWithDots.push("...");
    }

    // Add pages around current page (ensuring current page is always included)
    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== totalPages) {
        rangeWithDots.push(i);
      }
    }

    // Add ellipsis before last page if there's a gap
    if (endPage < totalPages - 1) {
      rangeWithDots.push("...");
    }

    // Always show last page if it's different from first
    if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="w-full overflow-x-auto">
      <Pagination className="flex-wrap min-w-fit">
        <PaginationPrevious
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          size={isMobile ? "sm" : "default"}
        >
          {isMobile ? "Prev" : "Previous"}
        </PaginationPrevious>
        {getVisiblePages().map((page, index) =>
          page === "..." ? (
            <PaginationEllipsis key={`ellipsis-${index}`} />
          ) : (
            <PaginationItem
              key={page}
              isActive={page === currentPage}
              onClick={() => setCurrentPage(page as number)}
              size={isMobile ? "sm" : "default"}
            >
              {page}
            </PaginationItem>
          ),
        )}
        <PaginationNext
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          size={isMobile ? "sm" : "default"}
        >
          {isMobile ? "Next" : "Next"}
        </PaginationNext>
      </Pagination>
    </div>
  );
}

export function PaginationCompact() {
  const [currentPage, setCurrentPage] = React.useState(3);
  const totalPages = 8;
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
      <Pagination variant="compact" className="flex-wrap">
        <PaginationPrevious
          size="sm"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          {isMobile ? "←" : "Prev"}
        </PaginationPrevious>
        <span className="text-sm text-muted-foreground px-2 whitespace-nowrap">
          Page {currentPage} of {totalPages}
        </span>
        <PaginationNext
          size="sm"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          {isMobile ? "→" : "Next"}
        </PaginationNext>
      </Pagination>
    </div>
  );
}

export function PaginationSimple() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = 5;
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Show fewer pages on mobile
  const visiblePages = isMobile ? Math.min(3, totalPages) : totalPages;
  const startPage =
    isMobile && totalPages > 3
      ? Math.max(1, Math.min(currentPage - 1, totalPages - 2))
      : 1;

  const pages = Array.from({ length: visiblePages }, (_, i) => startPage + i);

  return (
    <div className="w-full overflow-x-auto">
      <Pagination className="flex-wrap min-w-fit">
        <PaginationPrevious
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          size={isMobile ? "sm" : "default"}
        >
          {isMobile ? "Prev" : "Previous"}
        </PaginationPrevious>
        {pages.map((page) => (
          <PaginationItem
            key={page}
            isActive={page === currentPage}
            onClick={() => setCurrentPage(page)}
            size={isMobile ? "sm" : "default"}
          >
            {page}
          </PaginationItem>
        ))}
        <PaginationNext
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          size={isMobile ? "sm" : "default"}
        >
          {isMobile ? "Next" : "Next"}
        </PaginationNext>
      </Pagination>
    </div>
  );
}

export function PaginationMinimal() {
  const [currentPage, setCurrentPage] = React.useState(2);
  const totalPages = 10;
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <div className="w-full overflow-x-auto">
      <Pagination className="flex-wrap min-w-fit">
        <PaginationPrevious
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          size={isMobile ? "sm" : "default"}
        >
          {isMobile ? "←" : "Prev"}
        </PaginationPrevious>
        <div className="flex items-center px-2 sm:px-4">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {currentPage} / {totalPages}
          </span>
        </div>
        <PaginationNext
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          size={isMobile ? "sm" : "default"}
        >
          {isMobile ? "→" : "Next"}
        </PaginationNext>
      </Pagination>
    </div>
  );
}

export function PaginationWithInput() {
  const [currentPage, setCurrentPage] = React.useState(5);
  const [inputPage, setInputPage] = React.useState("5");
  const totalPages = 25;
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 768px)");

  const handleGoToPage = () => {
    const page = parseInt(inputPage);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleGoToPage();
    }
  };

  if (isMobile) {
    // Mobile layout: Stack vertically
    return (
      <div className="flex flex-col gap-4 w-full">
        <Pagination className="flex-wrap">
          <PaginationPrevious
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            size="sm"
          >
            Prev
          </PaginationPrevious>
          <PaginationItem isActive size="sm">
            {currentPage}
          </PaginationItem>
          <PaginationNext
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            size="sm"
          >
            Next
          </PaginationNext>
        </Pagination>
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground">Go to:</span>
          <Input
            type="number"
            min="1"
            max={totalPages}
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-16 h-8 px-2 text-sm "
          />
          <Button
            onClick={handleGoToPage}
            className="h-8 px-3 text-sm font-medium"
          >
            Go
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="overflow-x-auto">
        <Pagination className="flex-wrap min-w-fit">
          <PaginationPrevious
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            size={isTablet ? "sm" : "default"}
          >
            {isTablet ? "Prev" : "Previous"}
          </PaginationPrevious>
          <PaginationItem
            onClick={() => setCurrentPage(1)}
            isActive={currentPage === 1}
            size={isTablet ? "sm" : "default"}
          >
            1
          </PaginationItem>
          {currentPage > 3 && <PaginationEllipsis />}
          {currentPage > 2 && currentPage < totalPages && (
            <PaginationItem isActive size={isTablet ? "sm" : "default"}>
              {currentPage}
            </PaginationItem>
          )}
          {currentPage < totalPages - 2 && <PaginationEllipsis />}
          <PaginationItem
            onClick={() => setCurrentPage(totalPages)}
            isActive={currentPage === totalPages}
            size={isTablet ? "sm" : "default"}
          >
            {totalPages}
          </PaginationItem>
          <PaginationNext
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            size={isTablet ? "sm" : "default"}
          >
            {isTablet ? "Next" : "Next"}
          </PaginationNext>
        </Pagination>
      </div>
      <div className="flex items-center gap-2 whitespace-nowrap">
        <span className="text-sm text-muted-foreground">Go to:</span>
        <Input
          type="number"
          min="1"
          max={totalPages}
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-16 h-8 px-2 text-sm"
        />
        <Button
          onClick={handleGoToPage}
          className="h-8 px-3 text-sm font-medium"
        >
          Go
        </Button>
      </div>
    </div>
  );
}

export function PaginationSizes() {
  const [currentPage, setCurrentPage] = React.useState(2);
  const totalPages = 5;
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <div className="space-y-6">
      {/* Small */}
      <div>
        <div className="w-full overflow-x-auto">
          <Pagination className="flex-wrap min-w-fit">
            <PaginationPrevious
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              {isMobile ? "Prev" : "Previous"}
            </PaginationPrevious>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem
                key={page}
                size="sm"
                isActive={page === currentPage}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </PaginationItem>
            ))}
            <PaginationNext
              size="sm"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              {isMobile ? "Next" : "Next"}
            </PaginationNext>
          </Pagination>
        </div>
      </div>

      {/* Default */}
      <div>
        <div className="w-full overflow-x-auto">
          <Pagination className="flex-wrap min-w-fit">
            <PaginationPrevious
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              {isMobile ? "Prev" : "Previous"}
            </PaginationPrevious>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem
                key={page}
                isActive={page === currentPage}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </PaginationItem>
            ))}
            <PaginationNext
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              {isMobile ? "Next" : "Next"}
            </PaginationNext>
          </Pagination>
        </div>
      </div>

      {/* Large */}
      <div>
        <div className="w-full overflow-x-auto">
          <Pagination className="flex-wrap min-w-fit">
            <PaginationPrevious
              size="lg"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              {isMobile ? "Prev" : "Previous"}
            </PaginationPrevious>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem
                key={page}
                size="lg"
                isActive={page === currentPage}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </PaginationItem>
            ))}
            <PaginationNext
              size="lg"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              {isMobile ? "Next" : "Next"}
            </PaginationNext>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export function PaginationOutlined() {
  const [currentPage, setCurrentPage] = React.useState(2);
  const totalPages = 6;
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Show fewer pages on mobile
  const visiblePages = isMobile ? Math.min(3, totalPages) : totalPages;
  const startPage =
    isMobile && totalPages > 3
      ? Math.max(1, Math.min(currentPage - 1, totalPages - 2))
      : 1;

  const pages = Array.from({ length: visiblePages }, (_, i) => startPage + i);

  return (
    <div className="w-full overflow-x-auto">
      <Pagination className="flex-wrap min-w-fit">
        <PaginationPrevious
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          size={isMobile ? "sm" : "default"}
        >
          {isMobile ? "Prev" : "Previous"}
        </PaginationPrevious>
        {pages.map((page) => (
          <PaginationItem
            key={page}
            variant="outline"
            isActive={page === currentPage}
            onClick={() => setCurrentPage(page)}
            size={isMobile ? "sm" : "default"}
          >
            {page}
          </PaginationItem>
        ))}
        {isMobile &&
          totalPages > 3 &&
          startPage + visiblePages - 1 < totalPages && (
            <>
              <PaginationEllipsis />
              <PaginationItem
                variant="outline"
                isActive={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
                size="sm"
              >
                {totalPages}
              </PaginationItem>
            </>
          )}
        <PaginationNext
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          size={isMobile ? "sm" : "default"}
        >
          {isMobile ? "Next" : "Next"}
        </PaginationNext>
      </Pagination>
    </div>
  );
}
