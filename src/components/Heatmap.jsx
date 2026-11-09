import React from 'react';

function getLast30Days(data) {
  const countsByDate = new Map((data?.days || []).map((day) => [day.date, day]));
  const today = new Date();
  const end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 29);

  return Array.from({ length: 30 }, (_, index) => {
    const date = new Date(start);
    date.setUTCDate(date.getUTCDate() + index);
    const dateKey = date.toISOString().slice(0, 10);
    const existingDay = countsByDate.get(dateKey);
    return {
      date: dateKey,
      contributionCount: existingDay?.contributionCount ?? existingDay?.submissionCount ?? 0,
    };
  });
}

export default function Heatmap({ title, data, error, totalLabel }) {
  const days = data ? getLast30Days(data) : null;
  const leadingBlanks = days ? new Date(`${days[0].date}T00:00:00Z`).getUTCDay() : 0;
  const cells = days
    ? [
      ...Array(leadingBlanks).fill(null),
      ...days,
      ...Array((7 - ((leadingBlanks + days.length) % 7)) % 7).fill(null),
    ]
    : [];

  return (
    <div className="min-w-0 rounded-2xl border border-ink/10 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display font-bold text-2xl tracking-tightest">{title}</h2>
          <p className="mt-1 text-sm text-muted">Last 30 days</p>
        </div>
        {totalLabel && <p className="text-right text-sm font-medium text-ink">{totalLabel}</p>}
      </div>
      {error ? (
        <p className="text-sm text-muted" role="status">{error}</p>
      ) : days ? (
        <>
          <div className="overflow-x-auto pb-1">
            <div
              className="grid w-fit grid-flow-col grid-rows-[repeat(7,minmax(0,1fr))] gap-1.5"
              role="group"
              aria-label={`${title} activity heatmap`}
            >
              {cells.map((day, index) => {
                if (!day) return <span key={`empty-${index}`} aria-hidden="true" className="h-3 w-3" />;
                const count = day.contributionCount;
                const color = count === 0
                  ? 'bg-gray-200'
                  : count === 1
                    ? 'bg-green-200'
                    : count === 2
                      ? 'bg-green-400'
                      : count < 5
                        ? 'bg-green-600'
                        : 'bg-green-800';

                return (
                  <span
                    key={day.date}
                    className={`h-3 w-3 rounded-[3px] ${color}`}
                    title={`${day.date}: ${count} contributions`}
                    aria-label={`${day.date}: ${count} contributions`}
                  />
                );
              })}
            </div>
          </div>
          <div className="mt-5 flex items-center justify-end gap-1.5 text-xs text-muted" aria-hidden="true">
            <span>Less</span>
            <span className="h-3 w-3 rounded-[3px] bg-gray-200" />
            <span className="h-3 w-3 rounded-[3px] bg-green-200" />
            <span className="h-3 w-3 rounded-[3px] bg-green-400" />
            <span className="h-3 w-3 rounded-[3px] bg-green-600" />
            <span className="h-3 w-3 rounded-[3px] bg-green-800" />
            <span>More</span>
          </div>
        </>
      ) : (
        <p className="text-sm text-muted" role="status">Loading activity...</p>
      )}
    </div>
  );
}
