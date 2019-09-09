<script>
  import { onMount } from "svelte";
  import { villainStore } from "./villain.store.js";
  import { navigate } from "svelte-routing";
  import Loader from "../shared/Loader.svelte";

  let villainForm = {
    firstName: "",
    lastName: "",
    house: "",
    knownAs: ""
  };

  onMount(async () => {
    const id = window.location.href.match(/([^\/]+$)/)[0];
    await villainStore.loadVillainById(id);
    villainForm = $villainStore.villain;
    console.log(villainForm);
  });

  async function onSubmit() {
    await villainStore.updateVillain(villainForm);
  }
</script>

<style>

</style>

<main class="mx-auto px-4">
  {#if $villainStore.isLoading}
    <div
      class="text-4xl text-pink-900"
      style="display: flex; flex-direction: column; place-items: center;
      place-content: center">
      <Loader />
    </div>
  {:else}
    <main class="mx-auto px-4">
      <div class="p-2 text-2xl">Edit Hero</div>
      <form
        class="max-w-sm p-4 rounded overflow-hidden shadow-lg"
        on:submit|preventDefault={() => onSubmit()}>
        <div class="mb-1 pb-1">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="firstName">
            First Name
          </label>
          <input
            bind:value={villainForm.firstName}
            name="firstName"
            type="text"
            id="firstName"
            class="shadow appearance-none border rounded w-full py-2 px-3
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div class="mb-1 pb-1">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="lastName">
            Last Name
          </label>
          <input
            bind:value={villainForm.lastName}
            name="lastName"
            type="text"
            id="lastName"
            class="shadow appearance-none border rounded w-full py-2 px-3
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div class="mb-1 pb-1">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="house">
            House
          </label>
          <input
            bind:value={villainForm.house}
            name="house"
            type="text"
            id="house"
            class="shadow appearance-none border rounded w-full py-2 px-3
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div class="mb-1 pb-1">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="knownAs">
            Known as
          </label>
          <input
            bind:value={villainForm.knownAs}
            name="knownAs"
            type="text"
            id="knownAs"
            class="shadow appearance-none border rounded w-full py-2 px-3
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div class="mb-1 pb-1">
          <button
            type="submit"
            class="m-1 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2
            px-4 rounded">
            Update
          </button>
          <button
            on:click={() => navigate('/')}
            type="button"
            class="m-1 bg-transparent hover:bg-teal-500 text-teal-700
            font-semibold hover:text-purple py-2 px-4 border border-teal-500
            hover:border-transparent rounded">
            Back
          </button>
        </div>
      </form>
    </main>
  {/if}
</main>
