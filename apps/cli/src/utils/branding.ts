import gradient from 'gradient-string';
import pc from 'picocolors';

export const clawesomeGradient = gradient(['#6366f1', '#a855f7', '#06b6d4']);

// Custom Clawesome ASCII art — from clawesome-ascii-art-medium.txt
export const CLAWESOME_ASCII = `
                         φ
                        j╬                                    ╬▒
   ╓φ▒▒R^ DR        ╗▒▒  ╬H j▒  j▒▒▒▒▒^ #▒▒▒R^,φ▒▒R   ,╗DDD▒≥ ╬╬  jD     jDDDDD^
 #╝\`     [╠       ╓╣╜║╬  ║╬  ╠▒   ,╬╩         ╬Ü_   ╓╬╜      j╬╬H╒╬╬H
║╬       ╠H      #╩   ╬H ╘╬  ╠╬  ╔╝ _╬╝╝╝╝╩   \`╙╙╬H ╬H       ╠H╠╬╬╩╠╬   ╠╝╝╝╩
╙╬W,___ ║╠,,,, ╔╬\`    ║╬  ╬▒╬╩╬¼╬╜ ╔╠,,,,,,   ,,╔╬  ╬▒,__,╗ [╬ [╬╬  ╬H j╬,,,,,
  \`"^\`  """"" ^^      ╘╬_ '"  ╠╬  """"""""\`  ""\`     \`╙╙╙\`  ^   ^\`  ╠╬ "^^^^\`
                       ╬      ╘╩                                    ╘╩
                       \`
`;

export function clearConsole(): void {
  // \x1Bc clears the terminal screen and scrollback buffer
  // \x1B[2J\x1B[3J\x1B[H is another common ANSI sequence for clearing
  process.stdout.write('\x1Bc\x1B[2J\x1B[3J\x1B[H');
}

export async function displayBranding(version?: string): Promise<void> {
  clearConsole();
  console.log(clawesomeGradient.multiline(CLAWESOME_ASCII));
  if (version) {
    console.log(pc.dim(`  ${version}`));
  }
  console.log(clawesomeGradient('  ──────────────────────────────────────────────────') + '\n');
}

export function displayBrandingSync(version?: string): void {
  clearConsole();
  process.stdout.write(clawesomeGradient.multiline(CLAWESOME_ASCII));
  if (version) {
    process.stdout.write(pc.dim(`  ${version}\n`));
  }
  process.stdout.write(clawesomeGradient('  ──────────────────────────────────────────────────') + '\n\n');
}
