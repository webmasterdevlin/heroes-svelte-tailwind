<script>
  import { onMount, onDestroy } from "svelte";
  import Icon from "fa-svelte";
  import { faEdit, faEraser } from "@fortawesome/free-solid-svg-icons";
  import NewItemForm from "../shared/NewItemForm.svelte";
  import { villainStore } from "./villain.store.js";
  import { navigate } from "svelte-routing";

  let isShowNewItemForm = false;
  let villainForm = {
    firstName: "",
    lastName: "",
    house: "",
    knownAs: ""
  };

  let villainFormReset = {
    firstName: "",
    lastName: "",
    house: "",
    knownAs: ""
  };

  async function onSubmit() {
    await villainStore.createVillain(villainForm);
  }

  function showNewItemForm() {
    isShowNewItemForm = !isShowNewItemForm;
  }

  /* 
  Extra setup for not using auto-subscriptions ($ prefix is the auto-subscriptions).
  Will emit properties (1 or more) that changed.
  for some reason, there will be no reactions in the component if the local variable and the parameter of the anonymous arrow functions have the same names.
  This is the reason I had to renamed the parameters.
  */
  // let villains;
  // let isLoading;
  // const subscription = villainStore.subscribe(
  //   ({ villains: newVillains, isLoading: newIsLoading }) => {
  //     villains = newVillains;
  //     isLoading = newIsLoading;
  //   }
  // );
  // onDestroy(subscription);

  onMount(async () => {
    await villainStore.loadVillains();
  });

  function handleClickEdit(id) {
    navigate(`/edit-villain/${id}`, { replace: true });
  }

  async function handleClickDelete(id) {
    await villainStore.removeVillain(id);
  }
</script>

<style>

</style>

<!-- The newItemForm object of the child component sends it properties to the villainForm object of the parent component -->
<main class="container mx-auto px-4">
  <NewItemForm
    {isShowNewItemForm}
    bind:newItemForm={villainForm}
    handleOnSubmit={onSubmit}
    handleShowNewItemForm={showNewItemForm} />
  {#if $villainStore.isLoading}
    <div
      class="text-4xl text-pink-900"
      style="display: flex; flex-direction: column; place-items: center;
      place-content: center">
      Loading...
    </div>
  {:else}
    {#each $villainStore.villains as villain, index}
      <div class="max-w-sm m-5 p-10 rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
          <span class="text-orange-500">#{index + 1}</span>
          <div class="font-bold text-xl mb-2">
            {villain.firstName} {villain.lastName}
          </div>
          <div class="text-gray-700 text-base">{villain.knownAs}</div>

          <div class="px-6 py-4">
            <span
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm
              font-semibold text-gray-700 mr-2">
              {villain.house}
            </span>
          </div>
        </div>
        <section class="card-body">
          <div class="row">
            <button
              on:click={() => handleClickEdit(villain.id)}
              class="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2
              px-4 rounded">
              <Icon icon={faEdit} />
              Edit
            </button>
            <button
              on:click={() => handleClickDelete(villain.id)}
              class="m-1 bg-transparent hover:bg-red-500 text-red-700
              font-semibold hover:text-white py-2 px-4 border border-red-500
              hover:border-transparent rounded">
              <Icon icon={faEraser} />
              Delete
            </button>
          </div>
        </section>
      </div>
    {/each}
  {/if}
</main>
