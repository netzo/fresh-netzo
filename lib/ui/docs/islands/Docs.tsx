import { useSignal } from "@preact/signals";
import {
  NButton,
  NCard,
  NCheckbox,
  NChip,
  NDarkToggle,
  NDialog,
  NDropdown,
  NIconButton,
  NIconTitle,
  // NInputDate,
  // NInputDateRange,
  NInputText,
  NLink,
  NLoading,
  NPanelGrids,
  NRadio,
  NSectionBlock,
  NSelect,
  NSwitch,
  NTip,
} from "netzo/ui/components/mod.ts";
import ShowSource from "./ShowSource.tsx";

const VERSION = "0.2.6";
const REPO = "https://github.com/netzo/netzo/tree/main/lib/ui";

export default function Demo() {
  const showDialog = useSignal(false);
  // const showDropdown = useSignal(false);
  // const radio = useSignal("a");

  return (
    <div class="relative p-10">
      <div class="mx-auto w-full flex flex-col gap-4 container">
        <NTip icon="mdi-alert" n="yellow-600 dark:yellow-500">
          This library is heavily working in progress. Breaking changes may not
          follow semver. Pin the version if used.
        </NTip>

        <div class="flex items-center gap-2">
          <div class="text-4xl">
            @netzo/ui
          </div>
          <sup class="text-xl">
            <code>v{VERSION}</code>
          </sup>
        </div>

        <div class="mb-5 flex gap-1">
          <NButton n="sm" href={REPO} target="_blank" prependIcon="mdi-github">
            GitHub
          </NButton>

          <NDarkToggle />
        </div>

        <details>
          <summary class="cursor-pointer uppercase text-lg font-bold">
            Data
          </summary>
          <div class="flex flex-col gap-3 my-3">
            <NCard class="p4">
              <div class="n-header-upper">
                NTable <NChip class="n-chip-blue">soon</NChip>
              </div>
            </NCard>
          </div>
        </details>

        <details open>
          <summary class="cursor-pointer uppercase text-lg font-bold">
            Elements
          </summary>
          <div class="flex flex-col gap-3 my-3">
            <NCard class="p4">
              <div class="n-header-upper">
                Buttons
              </div>
              <div class="flex flex-wrap items-center gap-3">
                <NButton n="yellow6 dark:yellow5 xs border-solid">
                  XS Yellow
                </NButton>
                <NButton n="orange6 dark:orange5 sm dashed">
                  S Orange Dashed
                </NButton>
                <NButton
                  n="blue6 dark:blue5 solid"
                  prependIcon="mdi-information"
                >
                  Blue Solid
                </NButton>
                <NButton n="red6 dark:red5 solid" prependIcon="mdi-delete">
                  Red Solid
                </NButton>
                <NButton disabled>
                  Disabled
                </NButton>
                <NButton n="purple6 dark:purple5 xl">
                  XL Purple
                </NButton>
                <NIconButton icon="mdi-home" />
                <NIconButton icon="mdi-home" n="purple6 dark:purple5 xl" />
              </div>
              <ShowSource src="/docs/islands/Docs.tsx#L50-L67" />
            </NCard>

            <NCard class="p4">
              <div class="n-header-upper">
                Dropdown <NChip class="n-chip-blue">soon</NChip>
              </div>
              <div class="flex flex-col gap-2">
                <NDropdown v-model="showDropdown" n="lime6 dark:lime5">
                  <div class="flex flex-col gap-2 p-3">
                    <div>Item 1</div>
                    <div>Item 2</div>
                    <div>Item 3</div>
                    <div>Item 4</div>
                  </div>
                </NDropdown>
              </div>
              <ShowSource src="/docs/islands/Docs.tsx#L168-L180" />
            </NCard>

            <NCard class="p4">
              <div class="n-header-upper">
                NIconTitle
              </div>
              <div class="flex flex-col gap-2">
                <NIconTitle text="Home" icon="mdi-home" />
              </div>
              <ShowSource src="/docs/islands/Docs.tsx#L246" />
            </NCard>

            <NCard class="p4">
              <div class="n-header-upper">
                Links
              </div>
              <form class="flex items-center gap-3">
                <NLink to="/" n="green">
                  Homepage
                </NLink>
                <NLink href="https://netzo.io" target="_blank">
                  netzo.io
                </NLink>
              </form>
              <ShowSource src="/docs/islands/Docs.tsx#L86-L91" />
            </NCard>

            <NCard class="p4">
              <div class="n-header-upper">
                Loading
              </div>
              <div class="flex flex-col gap-2">
                <NLoading />
              </div>
              <ShowSource src="/docs/islands/Docs.tsx#L246" />
            </NCard>

            <NCard class="p4">
              <div class="n-header-upper">
                Tips
              </div>
              <div class="flex flex-col gap-2">
                <NTip n="lime6 dark:lime5" icon="mdi-check-circle">
                  Success!
                </NTip>
                <NTip n="yellow6 dark:yellow5" icon="mdi-alert">
                  Warning!
                </NTip>
                <NTip n="red6 dark:red5" icon="mdi-alert-circle">
                  Error!
                </NTip>
              </div>
              <ShowSource src="/docs/islands/Docs.tsx#L150-L158" />
            </NCard>
          </div>
        </details>

        <details open>
          <summary class="cursor-pointer uppercase text-lg font-bold">
            Form
          </summary>
          <div class="flex flex-col gap-3 my-3">
            <NCard class="p4">
              <div class="n-header-upper">
                Checkboxes
              </div>
              <div class="flex items-center gap-3">
                <NCheckbox n="sky6 dark:sky5 sm" checked={true}>
                  Small
                </NCheckbox>
                <NCheckbox n="red6 dark:red5" checked={false}>
                  Normal
                </NCheckbox>
                <NCheckbox
                  n="purple6 dark:purple5 xl"
                  checked={true}
                  disabled
                >
                  XL Disabled
                </NCheckbox>
              </div>
              <ShowSource src="/demo/islands/Docs.tsx#L77-L85" />
            </NCard>

            <NCard class="p4">
              <div class="n-header-upper">
                Radios
              </div>
              <form class="flex items-center gap-3">
                <NRadio
                  v-model="radio"
                  n="red6 dark:red5"
                  name="name"
                  value="a"
                >
                  Apple
                </NRadio>
                <NRadio
                  v-model="radio"
                  n="yellow6 dark:yellow5"
                  name="name"
                  value="b"
                >
                  Banana
                </NRadio>
                <NRadio
                  v-model="radio"
                  n="orange6 dark:orange5"
                  name="name"
                  value="c"
                >
                  Orange
                </NRadio>
              </form>
              <ShowSource src="/docs/islands/Docs.tsx#L101-L119" />
            </NCard>

            <NCard class="p4">
              <form>
                <div class="n-header-upper">
                  Select
                </div>
                <div class="flex flex-col gap-2">
                  <NSelect
                    n="lime6 dark:lime5"
                    value="Some value"
                  >
                    <option value="audi">Audi</option>
                    <option value="bmw">BMW</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="volkswagen">Volkswagen</option>
                  </NSelect>
                  <NSelect
                    n="pink6 dark:pink5"
                    icon="mdi-car"
                    placeholder="Select brand"
                    options={[
                      { value: "audi", innerHTML: "Audi" },
                      { value: "bmw", innerHTML: "BMW" },
                      { value: "mercedes", innerHTML: "Mercedes" },
                      { value: "volkswagen", innerHTML: "Volkswagen" },
                    ]}
                  />
                  <NButton class="self-start">
                    Submit
                  </NButton>
                </div>
              </form>
              <ShowSource src="/docs/islands/Docs.tsx#L190-L205" />
            </NCard>

            <NCard class="p4">
              <div class="n-header-upper">
                Switches
              </div>
              <div class="flex items-center gap-3">
                <NSwitch n="lime6 dark:lime5 sm" checked={true}>
                  SM
                </NSwitch>
                <NSwitch n="red6 dark:red5" checked={true}>
                  Normal
                </NSwitch>
                <NSwitch checked={true} disabled>
                  Disabled
                </NSwitch>
                <NSwitch n="purple6 dark:purple5 xl" checked={false}>
                  XL
                </NSwitch>
              </div>
              <ShowSource src="/docs/islands/Docs.tsx#L129-L140" />
            </NCard>

            <NCard class="p4">
              <form>
                <div class="n-header-upper">
                  InputText
                </div>
                <div class="flex flex-col gap-2">
                  <NInputText
                    n="lime6 dark:lime5"
                    value="Some value"
                  />
                  <NInputText
                    n="pink6 dark:pink5"
                    icon="mdi-account"
                    placeholder="Name"
                  />
                  <NInputText
                    n="pink6 dark:pink5"
                    icon="mdi-numeric"
                    placeholder="Age"
                    type="number"
                  />
                  <NInputText
                    n="lime6 dark:lime5"
                    icon="mdi-key"
                    type="password"
                    placeholder="Password"
                    required
                  />
                  <NButton class="self-start">
                    Submit
                  </NButton>
                </div>
              </form>
              <ShowSource src="/docs/islands/Docs.tsx#L190-L205" />
            </NCard>

            {
              /* <NCard class="p4">
              <div class="n-header-upper">
                InputDate
              </div>
              <div class="flex flex-col gap-2">
                <NInputDate n="lime6 dark:lime5" />
              </div>
              <ShowSource src="/docs/islands/Docs.tsx#L190-L205" />
            </NCard>

            <NCard class="p4">
              <div class="n-header-upper">
                InputDateRange
              </div>
              <div class="flex flex-col gap-2">
                <NInputDateRange n="lime6 dark:lime5" />
              </div>
              <ShowSource src="/docs/islands/Docs.tsx#L190-L205" />
            </NCard> */
            }
          </div>
        </details>

        <details open>
          <summary class="cursor-pointer uppercase text-lg font-bold">
            Layout
          </summary>
          <div class="flex flex-col gap-3 my-3">
            <NCard class="p4">
              <div class="n-header-upper">
                NCard <NChip class="n-chip-blue">soon</NChip>
              </div>
            </NCard>

            <NCard class="p4">
              <div class="n-header-upper">
                NPanelGrids <NChip class="n-chip-blue">soon</NChip>
              </div>
              <div class="flex flex-col gap-2">
                <NPanelGrids />
              </div>
              <ShowSource src="/docs/islands/Docs.tsx#L246" />
            </NCard>

            <NCard class="p4">
              <div class="n-header-upper">
                NSectionBlock <NChip class="n-chip-blue">soon</NChip>
              </div>
              <div class="flex flex-col gap-2">
                <NSectionBlock text="Header">
                  <>
                    <h4>Header 4</h4>
                    <p>Lorem ipsum</p>
                  </>
                </NSectionBlock>
              </div>
              <ShowSource src="/docs/islands/Docs.tsx#L246" />
            </NCard>
          </div>
        </details>

        <details open>
          <summary class="cursor-pointer uppercase text-lg font-bold">
            Overlay
          </summary>
          <div class="flex flex-col gap-3 my-3">
            <NCard class="p4">
              <div class="n-header-upper">
                Dialog
              </div>
              <div class="flex flex-col gap-2">
                <NDialog
                  class="max-w-500px"
                  buttonProps={{ text: "Open Dialog" }}
                >
                  <h3 class="mb2 text-lg font-semibold">Header 4</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam voluptatum, quibusdam, quia, quod voluptates
                    voluptatem voluptatibus quos dolorum quas voluptate.
                    Quisquam voluptatum, quibusdam, quia, quod voluptates
                    voluptatem voluptatibus quos dolorum quas voluptate.
                  </p>
                </NDialog>
                <NDialog buttonProps={{ text: "Open Dialog Form" }}>
                  <form method="dialog">
                    <NInputText
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      required
                      autofocus
                    >
                    </NInputText>
                    <menu class="pt2">
                      <NButton value="cancel" class="mr1">Cancel</NButton>
                      <NButton value="default">Confirm</NButton>
                    </menu>
                  </form>
                </NDialog>
              </div>
              <ShowSource src="/docs/islands/Docs.tsx#L215-L231" />
            </NCard>
          </div>
        </details>
      </div>
    </div>
  );
}
