// Typography style objects — use these in StyleSheet.create instead of
// repeating fontSize / fontWeight values across every file.

export const typography = {
  // --- Screen-level text ---
  heading: { fontSize: 28, fontWeight: "bold" as const },   // screen titles
  title: { fontSize: 20 },                                  // section titles
  subtitle: { fontSize: 16 },                               // description lines

  // --- Body & labels ---
  body: { fontSize: 14 },
  label: { fontSize: 12 },                                  // small captions

  // --- Weather-specific ---
  temperature: { fontSize: 28 },                            // current temp
  statValue: { fontSize: 20, fontWeight: "500" as const },  // wind / humidity / uv
  temperatureMax: { fontSize: 18 },                         // forecast max
  temperatureMin: { fontSize: 14 },                         // forecast min
  condition: { fontWeight: "bold" as const },               // weather condition label
}
