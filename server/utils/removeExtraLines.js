export function trim_and_remove_blank_lines(string) {
    return string.replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, "");
}
