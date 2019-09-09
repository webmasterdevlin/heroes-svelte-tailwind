<script>
  import { onMount, onDestroy } from "svelte";
  import Icon from "fa-svelte";
  import { faEdit, faEraser } from "@fortawesome/free-solid-svg-icons";
  import NewItemForm from "../shared/NewItemForm.svelte";
  import { heroStore, getTotalHeroes } from "./hero.store.js";
  import { navigate } from "svelte-routing";
  import Loader from "../shared/Loader.svelte";

  let isShowNewItemForm = false;
  let heroForm = {
    firstName: "",
    lastName: "",
    house: "",
    knownAs: ""
  };

  let heroFormReset = {
    firstName: "",
    lastName: "",
    house: "",
    knownAs: ""
  };

  async function onSubmit() {
    await heroStore.createHero(heroForm);
    heroForm = heroFormReset;
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
  // let heroes;
  // let isLoading;
  // const subscription = heroStore.subscribe(
  //   ({ heroes: newHeroes, isLoading: newIsLoading }) => {
  //     heroes = newHeroes;
  //     isLoading = newIsLoading;
  //   }
  // );
  // onDestroy(subscription);

  onMount(async () => {
    await heroStore.loadHeroes();
  });

  function handleClickEdit(id) {
    navigate(`/edit-hero/${id}`, { replace: true });
  }

  async function handleClickDelete(id) {
    await heroStore.removeHero(id);
  }
</script>

<style>

</style>

<!-- The newItemForm object of the child component sends it properties to the heroForm object of the parent component -->
<main class="container mx-auto px-4">
  <NewItemForm
    {isShowNewItemForm}
    bind:newItemForm={heroForm}
    handleOnSubmit={onSubmit}
    handleShowNewItemForm={showNewItemForm} />
  {#if $heroStore.isLoading}
    <Loader />
  {:else}
    {#each $heroStore.heroes as hero, index}
      <div class="max-w mx-auto flex m-4 p-6 bg-white rounded-lg shadow-xl">
        <div class="md:flex">
          <div class="px-6 py-4">
            <span class="text-orange-500">#{index + 1}</span>
            <div class="font-bold text-xl mb-2">
              {hero.firstName} {hero.lastName}
            </div>
            <div class="text-gray-700 text-base">{hero.knownAs}</div>
            <div class="px-6 py-4">
              <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm
                font-semibold text-gray-700 mr-2">
                {hero.house}
              </span>
            </div>
          </div>
          <section class="card-body">
            <div class="row">
              <button
                on:click={() => handleClickEdit(hero._id)}
                class="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold
                py-2 px-4 rounded">
                <Icon icon={faEdit} />
                Edit
              </button>
              <button
                on:click={() => handleClickDelete(hero._id)}
                class="m-1 bg-transparent hover:bg-red-500 text-red-700
                font-semibold hover:text-white py-2 px-4 border border-red-500
                hover:border-transparent rounded">
                <Icon icon={faEraser} />
                Delete
              </button>
            </div>
          </section>
        </div>
      </div>
    {/each}
  {/if}
  {#if $getTotalHeroes === 0 && !$heroStore.isLoading}
    <div
      class="text-2xl text-pink-900"
      style="display: flex; flex-direction: column; place-items: center;
      place-content: center">
      <h2>Empty list. Start adding.</h2>
    </div>
  {/if}
</main>
