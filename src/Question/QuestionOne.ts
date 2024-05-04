export function getClockAngle(hh_mm: string): number {
  const [hh, mm] = hh_mm.split(":").map((x) => parseInt(x));

  if (hh < 0 || hh > 23 || mm < 0 || mm > 59) {
    throw new Error("Invalid input");
  }

  const hourAngle: number = (hh % 12) * 30 + mm / 2;
  const minuteAngle: number = mm * 6;
  const angle: number = Math.abs(hourAngle - minuteAngle);

  return Math.min(angle, 360 - angle);
}
