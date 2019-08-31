<script>
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import Icon from "fa-svelte";
  import { createEventDispatcher } from "svelte";
  import {
    faPlus,
    faSave,
    faChevronLeft
  } from "@fortawesome/free-solid-svg-icons";

  export let isShowNewItemForm;
  export let handleOnSubmit;
  export let handleShowNewItemForm;

  export let newItemForm = {}; // Exposes to bind to the parent component

  onMount(() => {});
</script>

<style>

</style>

<section>
  <div style="width: 50vw; padding-top: 20px">
    <div class="d-flex flex-row justify-content-start">
      <button
        on:click={handleShowNewItemForm}
        type="button"
        class="m-1 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2
        px-4 rounded">
        <Icon icon={faPlus} />
        Add New
      </button>

      {#if isShowNewItemForm}
        <button
          in:fly={{ x: 200, duration: 2000 }}
          out:fade
          on:click={handleShowNewItemForm}
          type="button"
          class="m-1 bg-transparent hover:bg-purple-500 text-purple-700
          font-semibold hover:text-purple py-2 px-4 border border-purple-500
          hover:border-transparent rounded">
          <Icon icon={faChevronLeft} />
          Cancel
        </button>
      {/if}

    </div>
    {#if isShowNewItemForm}
      <div
        class="card my-3"
        style="width:auto"
        in:fly={{ y: 200, duration: 2000 }}
        out:fade>
        <form
          class="max-w-sm p-4 rounded overflow-hidden shadow-lg"
          on:submit|preventDefault={handleOnSubmit}>
          <div>
            <label for="firstName">First Name</label>
            <!-- bind:value means pass the value of the input to the heroForm.firstName property, which then will be passed to the parent component -->
            <!-- That's why I created the export let newItemForm component -->
            <input
              bind:value={newItemForm.firstName}
              name="firstName"
              id="firstName"
              type="text"
              class="bg-gray-200 appearance-none border-2 border-gray-200
              rounded w-full py-2 px-4 text-gray-700 leading-tight
              focus:outline-none focus:bg-white focus:border-purple-500" />
          </div>
          <div>
            <label for="lastName">Last Name</label>
            <input
              bind:value={newItemForm.lastName}
              name="lastName"
              id="lastName"
              type="text"
              class="bg-gray-200 appearance-none border-2 border-gray-200
              rounded w-full py-2 px-4 text-gray-700 leading-tight
              focus:outline-none focus:bg-white focus:border-purple-500" />
          </div>
          <div>
            <label for="house" class="mt-3">House</label>
            <input
              bind:value={newItemForm.house}
              name="house"
              id="house"
              type="text"
              class="bg-gray-200 appearance-none border-2 border-gray-200
              rounded w-full py-2 px-4 text-gray-700 leading-tight
              focus:outline-none focus:bg-white focus:border-purple-500" />
          </div>
          <div>
            <label for="knownAs" class="mt-3">Known as</label>
            <input
              bind:value={newItemForm.knownAs}
              name="knownAs"
              id="knownAs"
              type="text"
              class="bg-gray-200 appearance-none border-2 border-gray-200
              rounded w-full py-2 px-4 text-gray-700 leading-tight
              focus:outline-none focus:bg-white focus:border-purple-500" />
          </div>
          <div class="p-2">
            <button
              type="submit"
              class="bg-orange-500 hover:bg-yellow-700 text-white font-bold py-2
              px-4 rounded-full">
              <Icon icon={faSave} />
              Save
            </button>
          </div>
        </form>
      </div>
    {/if}
  </div>
</section>
