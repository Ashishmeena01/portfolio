import Heatmap from '../components/Heatmap';

export default function Contributions({ contributions }) {
  const errors = contributions?.errors || {};

  return (
    <section id="github-leetcode" className="border-t border-ink/10">
      <div className="max-w-5xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-6">
        <Heatmap
          title="GitHub"
          data={contributions?.github}
          error={contributions?.error || errors.github}
          totalLabel={contributions?.github ? `${contributions.github.total} contributions in the last 30 days` : null}
        />
        <Heatmap
          title="LeetCode"
          data={contributions?.leetcode}
          error={contributions?.error || errors.leetcode}
          totalLabel={contributions?.leetcode ? `${contributions.leetcode.totalActiveDays} active days in the last 30 days` : null}
        />
      </div>
    </section>
  );
}
