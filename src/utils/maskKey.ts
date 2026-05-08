export default function maskKey(key: string) {
  return "*".repeat(key.length - 4) + key.slice(-4);
}
