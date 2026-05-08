export default function capitalize(str: string) {
  // if (!str) {
  //   return str;
  // }
  //
  // return str.charAt(0).toUpperCase() + str.slice(1);

  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
