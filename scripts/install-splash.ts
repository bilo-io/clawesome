import { readFileSync } from 'fs';
import { join } from 'path';

// Pure ANSI color constants
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const WHITE = "\x1b[37m";
const INDIGO = "\x1b[38;5;63m";
const PURPLE = "\x1b[38;5;135m";
const CYAN = "\x1b[38;2;6;182;212m";

const CLAWESOME_ASCII = `
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

function getVersion(): string {
  try {
    const pkgPath = join(import.meta.dir, '../apps/gateway/package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    return pkg.version;
  } catch {
    return '0.1.0';
  }
}

function clearConsole(): void {
  process.stdout.write('\x1Bc\x1B[2J\x1B[3J\x1B[H');
}

function run() {
  clearConsole();
  
  // Simple "gradient" simulation using ANSI colors for the ASCII art
  // We'll just print it in INDIGO for now to keep it clean and dependency-free
  process.stdout.write(INDIGO + CLAWESOME_ASCII + RESET);
  
  const version = getVersion();
  
  process.stdout.write('\n' + INDIGO + '  ────────────────────────────────────────────────────────────' + RESET + '\n');
  process.stdout.write(`  ${BOLD}${WHITE}installing ${RESET}${INDIGO}clawesome@${version}${RESET}${BOLD}${WHITE} ...${RESET}\n`);
  process.stdout.write(INDIGO + '  ────────────────────────────────────────────────────────────' + RESET + '\n\n');
}

run();
