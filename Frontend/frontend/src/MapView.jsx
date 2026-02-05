export default function MapView({
  svgRef,
  viewBox,
  onPointerMove,
  onPointerLeave,
  onTouchStart,
  onClick,
  children,
}) {
  return (
    <section className="ag-canvas travel-map h-full w-full rounded-xl border border-slate-200">
      <svg
        ref={svgRef}
        onMouseMove={onPointerMove}
        onMouseLeave={onPointerLeave}
        onTouchStart={onTouchStart}
        onClick={onClick}
        className="ag-canvas_svg travel-map__svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        aria-label="World map"
        preserveAspectRatio="xMidYMid meet"
      >
        {children}
      </svg>
    </section>
  );
}
