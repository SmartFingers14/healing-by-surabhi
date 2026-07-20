# Graph Report - healing-by-surabhi  (2026-07-20)

## Corpus Check
- 34 files · ~6,877,278 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 115 nodes · 147 edges · 20 communities (13 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `045e9dc2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 15|Community 15]]

## God Nodes (most connected - your core abstractions)
1. `siteConfig` - 14 edges
2. `personalServices` - 5 edges
3. `businessServices` - 5 edges
4. `allServices` - 5 edges
5. `consultationService` - 3 edges
6. `testimonials` - 3 edges
7. `stats` - 2 edges
8. `faqs` - 2 edges
9. `pageview()` - 2 edges
10. `cn()` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities (20 total, 7 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.19
Nodes (4): allServices, Service, siteConfig, stats

### Community 1 - "Community 1"
Cohesion: 0.16
Nodes (4): links, iconMap, businessServices, personalServices

### Community 2 - "Community 2"
Cohesion: 0.15
Nodes (7): RazorpayInstance, RazorpayOptions, RazorpayResponse, Status, Window, mysticalSymbols, numerologyNumbers

### Community 3 - "Community 3"
Cohesion: 0.17
Nodes (4): metadata, FbqArgs, pageview(), Window

### Community 4 - "Community 4"
Cohesion: 0.17
Nodes (8): faqs, included, problems, questions, reviewImages, reviews, steps, metadata

### Community 5 - "Community 5"
Cohesion: 0.2
Nodes (7): PROBLEMS, RazorpayInstance, RazorpayOptions, RazorpayResponse, Status, Window, consultationService

### Community 8 - "Community 8"
Cohesion: 0.4
Nodes (4): code:bash (npm run dev), Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **36 isolated node(s):** `eslintConfig`, `nextConfig`, `config`, `config`, `metadata` (+31 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `siteConfig` connect `Community 0` to `Community 1`, `Community 2`, `Community 3`, `Community 4`, `Community 5`, `Community 6`, `Community 7`?**
  _High betweenness centrality (0.152) - this node is a cross-community bridge._
- **Why does `personalServices` connect `Community 1` to `Community 0`, `Community 6`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Why does `businessServices` connect `Community 1` to `Community 0`, `Community 6`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `config` to the rest of the system?**
  _36 weakly-connected nodes found - possible documentation gaps or missing edges._