# Figma Code Connect POC — Enchanted React Components

> **Branch:** `feature/DXQ-50524-enchanted-react-and-figma-code-connect-poc`  
> **Figma file:** [HCLED-Components-V3--POC](https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC)

---

## What Was Built in This POC

| Deliverable | File(s) | Purpose |
|---|---|---|
| MCP server config | `.vscode/mcp.json` | Connects GitHub Copilot Agent to live Figma data |
| VS Code settings | `.vscode/settings.json` | Enables MCP + Copilot agent task execution |
| New component | `src/Tag/Tag.tsx` | Tag component created from Figma design |
| New component stories | `src/Tag/Tag.stories.tsx` | Storybook visual test + interactive story |
| New component index | `src/Tag/index.ts` | Re-exports Tag for library consumers |
| **New Code Connect** | `src/Tag/Tag.figma.tsx` | Links Tag React → Figma Dev Mode (new component) |
| **Updated Code Connect** | `src/Button/Button.figma.tsx` | Links Button React → Figma Dev Mode (existing component) |
| Figma config | `figma.config.json` | Tells CLI where to find all `*.figma.tsx` files |
| Environment template | `.env.example` | Token setup guide for other developers |

---

## Architecture

```
┌──────────────────────────────────┐    REST API (read)    ┌──────────────────────┐
│  Figma Design File               │◄──────────────────────│  GitHub Copilot      │
│  HCLED-Components-V3--POC        │                       │  (Agent Mode)        │
│  node-id=23760-19030  (Tag)      │                       │  via MCP server      │
│  node-id=1338-465763  (Button)   │                       └──────────────────────┘
└──────────────────────────────────┘
         ▲
         │  figma connect publish  (write Dev Resources)
         │
┌────────┴───────────────────────────────────────────────────────────────┐
│  enchanted-react-components/src/                                       │
│                                                                        │
│  Tag/                                                                  │
│    Tag.tsx          ← React component (created from Figma)             │
│    Tag.figma.tsx    ← Code Connect: Figma variant → React props        │
│    Tag.stories.tsx  ← Storybook stories                                │
│    index.ts         ← Re-exports                                       │
│                                                                        │
│  Button/                                                               │
│    Button.tsx          ← Existing React component                      │
│    Button.figma.tsx    ← Code Connect: Figma variant → React props     │
│    Button.stories.tsx  ← Existing Storybook stories                   │
│    index.ts            ← Existing re-exports                           │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Prerequisites

| Tool | Version | Check |
|---|---|---|
| Node.js | ≥ 18 | `node -v` |
| VS Code | ≥ 1.99 | `code --version` |
| GitHub Copilot Chat | Latest | VS Code Extensions panel |

---

## One-Time Setup

### 1. Install dependencies

```bash
npm install
```

`@figma/code-connect` is already in `devDependencies`.

### 2. Configure your Figma PAT

```bash
# Copy the template
cp .env.example .env

# Edit .env — paste your actual token (never commit this file)
```

How to generate a token:
1. Figma → Account Settings → Security → Personal access tokens
2. Click **Generate new token**
3. Required scopes: `File Content (read)` + `Dev Resources (read + write)`

### 3. Export token for the current shell session

```bash
export FIGMA_ACCESS_TOKEN=$(grep FIGMA_ACCESS_TOKEN .env | cut -d= -f2)
```

> The `.vscode/mcp.json` reads `${env:FIGMA_ACCESS_TOKEN}` — so the token
> must be in the shell environment before you launch VS Code.

### 4. Open VS Code — MCP server auto-starts

```bash
code .
```

To verify: open **Copilot Chat** → click the 🔧 tools icon → you should see **figma** listed.

---

## Workflow A — Creating a New Component from Figma (Tag example)

### Step 1: Find the Figma node ID

1. Open the [Figma file](https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC)
2. Click the component frame (e.g., **Tag**)
3. Right-click → **Copy link to selection** — URL looks like:
   `...?node-id=23760-19030`

Or use the REST API to list all component sets:

```bash
curl -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/hSgxFly4e92zns5LJXAsNB/component_sets" \
  | jq '[.meta.component_sets[] | {name, node_id}] | sort_by(.name)'
```

### Step 2: Auto-generate the Code Connect scaffold

```bash
npx figma connect create \
  "https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC?node-id=23760-19030" \
  --token $FIGMA_ACCESS_TOKEN
```

This creates a `*.figma.tsx` scaffold with the Figma property names already
populated. You then edit it to match your actual component props.

### Step 3: Review and adjust the mapping

Open the generated file and map each Figma property to the React prop:

```tsx
// Figma variant property → TagVariants enum
variant: figma.enum('variant', {
  neutral: TagVariants.NEUTRAL,
  error: TagVariants.ERROR,
  information: TagVariants.INFORMATION,
  warning: TagVariants.WARNING,
  success: TagVariants.SUCCESS,
}),
```

> **Tip:** Use the Figma **Inspect panel** (Dev Mode → right panel) to see
> the exact property names and their possible values — they are case-sensitive.

### Step 4: Validate locally (dry run)

```bash
npm run figma:parse
# or
npx figma connect parse --token $FIGMA_ACCESS_TOKEN
```

Expected output: lists each `*.figma.tsx` file found, shows which component
and URL it connects to, and reports any mapping errors.

### Step 5: Publish to Figma Dev Mode

```bash
npm run figma:publish -- --token $FIGMA_ACCESS_TOKEN
```

### Step 6: Verify in Figma

1. Open the Figma file in **Dev Mode** (keyboard shortcut: `Shift + D`)
2. Click the **Tag** component frame
3. In the right panel → **Code** tab
4. You should now see the live React snippet reflecting the selected variant

---

## Workflow B — Updating an Existing Component (Button example)

Use this when a component already exists in code but its `*.figma.tsx`
connection file is missing or outdated.

### Step 1: Find the component set node ID

```bash
curl -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/hSgxFly4e92zns5LJXAsNB/component_sets" \
  | jq '.meta.component_sets[] | select(.name == "Button") | {name, node_id}'
# → { "name": "Button", "node_id": "1338:465763" }
```

### Step 2: Check the exact Figma variant property names

```bash
curl -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/hSgxFly4e92zns5LJXAsNB/components" \
  | jq '[.meta.components[] | select(.containing_frame.name == "Button") | .name] | .[0:5]'
# → ["state=default, disabled=False, inversecolors=False, variant=contained, color=primary, size=medium, selected=False", ...]
```

This tells you the exact property names to use in your `figma.enum()` / `figma.boolean()` calls.

### Step 3: Create the Code Connect file

```bash
npx figma connect create \
  "https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC?node-id=1338-465763" \
  --token $FIGMA_ACCESS_TOKEN
```

### Step 4: Edit — align Figma properties with React props

Key patterns used in `Button.figma.tsx`:

```tsx
// Boolean Figma property → boolean React prop
disabled: figma.boolean('disabled', { true: true, false: false }),

// Enum Figma property → enum/string React prop
variant: figma.enum('variant', {
  contained: ButtonVariants.CONTAINED,
  outlined: ButtonVariants.OUTLINED,
  text: ButtonVariants.TEXT,
}),
```

> Visual-only Figma properties (like `state=hover`) have **no React
> equivalent** — simply omit them from the props mapping.

### Step 5: Validate and publish

```bash
npm run figma:parse     # validate
npm run figma:publish -- --token $FIGMA_ACCESS_TOKEN   # publish
```

---

## Applying This to Any Other Component

Follow the same checklist for every component:

```
□ 1. Find the component set node ID (REST API or copy link from Figma)
□ 2. List the variant property names from the API (or Figma Inspect panel)
□ 3. Run: npx figma connect create "<URL>" --token $FIGMA_ACCESS_TOKEN
□ 4. Edit the generated *.figma.tsx:
      - Replace placeholder enum values with your React enum/prop values
      - Delete visual-only properties (state, hover, etc.)
      - Write the example() function using your actual component
□ 5. Run: npm run figma:parse   (zero errors required)
□ 6. Run: npm run figma:publish -- --token $FIGMA_ACCESS_TOKEN
□ 7. Open Figma Dev Mode → select the component → verify Code tab
```

### Components already in scope for Code Connect

Based on the Figma file component sets, the following are good candidates:

| Figma name | Enchanted component | node_id |
|---|---|---|
| Avatar | `src/Avatar/Avatar.tsx` | `4278:43247` |
| Badge | `src/Badge/Badge.tsx` | `11517:142163` |
| Checkbox | `src/Checkbox/Checkbox.tsx` | `1338:466326` |
| Chip | `src/Chip/Chip.tsx` | `1443:48830` |
| IconButton | `src/IconButton/IconButton.tsx` | `1322:451818` |
| Link | `src/Link/Link.tsx` | `10812:145652` |
| Radio | `src/Radio/Radio.tsx` | `1390:23009` |
| Snackbar | `src/Snackbar/Snackbar.tsx` | `1519:114494` |
| Switch | `src/Switch/Switch.tsx` | `1339:468095` |
| TextField | `src/TextField/TextField.tsx` | `1418:23335` |
| Tooltip | `src/Tooltip/Tooltip.tsx` | `1482:50173` |

---

## CLI Commands Reference

| Command | What it does |
|---|---|
| `npm run figma:create` | Scaffold a `.figma.tsx` for a Figma node URL |
| `npm run figma:parse` | Validate all `.figma.tsx` files locally (no network write) |
| `npm run figma:publish` | Publish all connections to Figma Dev Mode |
| `npm run figma:unpublish` | Remove all published connections from Figma |

All commands accept `-- --token $FIGMA_ACCESS_TOKEN` to pass the token explicitly.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| MCP server not in Copilot tools list | Ensure `FIGMA_ACCESS_TOKEN` is exported **before** launching VS Code, then `Developer: Reload Window` |
| `401 Unauthorized` on publish | Token expired or missing `Dev Resources (write)` scope — regenerate in Figma settings |
| `figma-developer-mcp: command not found` | Run `npm install` in the project root |
| Figma property name mismatch | Open Figma Inspect panel → property names are **case-sensitive** |
| Node ID not found | Ensure you copied the link from the **component frame**, not an inner layer or a group |
| `figma connect parse` shows 0 files | Check `figma.config.json` — `include` pattern must match your `.figma.tsx` paths |
