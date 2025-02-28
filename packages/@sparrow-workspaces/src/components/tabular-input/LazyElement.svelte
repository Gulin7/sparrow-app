<script lang="ts">
  import { inview } from "svelte-inview";
  import { trashIcon as trashIcon } from "@sparrow/library/assets";
  import { CodeMirrorInput } from "../";
  import { Tooltip } from "@sparrow/library/ui";
  import type {
    ObserverEventDetails,
    ScrollDirection,
    Options,
  } from "svelte-inview";

  export let element;
  export let index;
  export let pairs;
  export let theme;
  export let environmentVariables;
  export let onUpdateEnvironment;
  export let updateParam;
  export let updateCheck;
  export let deleteParam;
  export let isInputBoxEditable;
  export let isCheckBoxEditable;

  let isInView: boolean = false;
  let scrollDirection: ScrollDirection | any;
  const options: Options = {
    rootMargin: "0px",
    unobserveOnEnter: true,
    threshold: 0.5,
  };

  const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
    isInView = detail.inView;
    scrollDirection = detail?.scrollDirection?.vertical;
  };
</script>

<div
  use:inview={options}
  on:inview_change={handleChange}
  class="w-100 pair-data-row px-3 d-flex align-items-center"
>
  {#if isInView}
    <div style="height:14px; width:14px;" class="me-3">
      {#if pairs.length - 1 != index || !isInputBoxEditable}
        <!-- checkbox should be visible to last row in readonly mode -->
        <label class="checkbox-parent">
          <input
            type="checkbox"
            bind:checked={element.checked}
            on:input={() => {
              updateCheck(index);
            }}
            disabled={!isCheckBoxEditable}
          />
          <span class="checkmark"></span>
        </label>
      {/if}
    </div>

    <div class="d-flex" style="width: calc(100% - 64px);">
      <div class="w-50 position-relative">
        <CodeMirrorInput
          bind:value={element.key}
          onUpdateInput={() => {
            updateParam(index);
          }}
          disabled={!isInputBoxEditable ? true : false}
          placeholder={"Add Key"}
          {theme}
          {environmentVariables}
          {onUpdateEnvironment}
        />
      </div>
      <div class="w-50 position-relative">
        <CodeMirrorInput
          bind:value={element.value}
          onUpdateInput={() => {
            updateParam(index);
          }}
          placeholder={"Add Value"}
          disabled={!isInputBoxEditable ? true : false}
          {theme}
          {environmentVariables}
          {onUpdateEnvironment}
        />
      </div>
    </div>
    <div
      style="width:16px;"
      class="ms-3 d-flex justify-content-center align-items-center"
    >
      <div class="d-flex" style="width:16px;">
        <div class="d-flex">
          {#if pairs.length - 1 != index}
            <!-- lists first to last second row -->
            {#if isInputBoxEditable}
              <Tooltip title={"Delete"} placement={"bottom"} distance={10}>
                <button
                  class="trash-icon bg-secondary-700 border-radius-2 d-flex justify-content-center align-items-center p-0 border-0"
                  style="width: 16px; height:16px; "
                  on:click={() => {
                    deleteParam(index);
                  }}
                >
                  <img src={trashIcon} style="height: 100%; width: 100%;" />
                </button>
              </Tooltip>
            {/if}
          {/if}
        </div>
      </div>
    </div>
  {/if}
  {#if !isInView}
    <div class="skelton-parent"></div>
  {/if}
</div>

<style>
  .pair-data-row:first-child {
    border-top: none !important;
    height: 24px !important;
  }
  .pair-data-row {
    padding-top: 3px;
    padding-bottom: 3px;
    height: calc(24px);
    background-color: var(--bg-secondary-700);
  }

  /* The checkbox-parent */
  .checkbox-parent {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Hide the browser's default checkbox */
  .checkbox-parent input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    background-color: transparent;
    border: 2px solid var(--text-secondary-500);
  }

  /* Create a custom checkbox */
  .checkbox-parent .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 14px;
    width: 14px;
    border-radius: 3px;
    background-color: transparent;
    border: 2px solid var(--text-secondary-500);
  }

  /* On mouse-over, add a grey background color */
  /* .checkbox-parent:hover input ~ .checkmark {
    background-color: #ccc;
  } */

  /* When the checkbox is checked, add a blue background */
  .checkbox-parent input:checked ~ .checkmark {
    border: none;
    background-color: var(--bg-primary-300);
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkbox-parent .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .checkbox-parent input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .checkbox-parent .checkmark:after {
    left: 5px;
    top: 2px;
    width: 4px;
    height: 8px;
    border: solid var(--text-secondary-800);
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .skelton-parent {
    display: flex;
    height: 24px;
    padding: 2px 20px 2px 0px;
    margin: 0px;
    gap: 10%;
  }
</style>
