# GAPRAIDER Source Adapter Contracts

Every adapter returns normalized evidence records. An adapter must never fabricate values when access is missing.

## Common response

```json
{
  "source": "",
  "state": "connected | manual_required | unavailable | blocked_by_policy",
  "collected_at": "ISO-8601 timestamp",
  "query": "",
  "records": [],
  "notes": ""
}
```

## Evidence record

```json
{
  "keyword": "",
  "source_url": "",
  "observed_title": "",
  "observed_text": "",
  "observed_metric_name": "",
  "observed_metric_value": null,
  "observed_metric_unit": "",
  "published_at": null,
  "confidence": 1,
  "manual_capture": false
}
```

`observed_metric_value` must remain `null` unless the source actually provides a measurable value.

## TikTok Creator Search Insights

Default state: `manual_required`.

Accept screenshots, exports, or user-entered records. Preserve the visible keyword, content-gap label, search-demand signal, and capture timestamp. Do not infer exact search volume from qualitative labels.

## X Search

Default state: `manual_required` until an approved connector is available.

Collect visible queries, recurring questions, timestamps, URLs, and engagement counts only when actually observed. Do not equate engagement with search demand.

## Reddit

Default state: `manual_required` until an approved connector is available.

Collect post titles, question wording, subreddit, timestamp, URL, and visible engagement. Treat repeated questions as qualitative demand evidence, not measured search volume.

## YouTube Autocomplete

Default state: `manual_required`.

Record suggestions exactly as observed with locale, timestamp, and seed query. Autocomplete position is an observed ordering signal, not a volume estimate.

## Google Trends

Default state: `manual_required` until an approved adapter is configured.

Preserve region, date range, comparison set, relative-interest values, and capture timestamp. Relative interest is not absolute search volume.

## GitHub Trending

Default state: `manual_required` until an approved adapter is configured.

Record repository name, description, language, visible stars, trend window, URL, and capture timestamp. Repository attention does not automatically equal creator search demand.

## Policy failure behavior

When a source cannot be accessed:

```json
{
  "source": "tiktok_creator_search_insights",
  "state": "manual_required",
  "collected_at": "2026-07-16T00:00:00Z",
  "query": "AI agents",
  "records": [],
  "notes": "Authenticated browser access is not configured. No metrics were generated."
}
```
