import React from "react";

interface PaginationProps {
  currentIndex: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentIndex,
  total,
  onNext,
  onPrev,
}) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <button onClick={onPrev} disabled={currentIndex === 0}>
        Previous
      </button>
      <span style={{ margin: "0 15px" }}>
        {currentIndex + 1} / {total}
      </span>
      <button onClick={onNext} disabled={currentIndex === total - 1}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
