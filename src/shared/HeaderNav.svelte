<script>
  import { onMount } from "svelte";
  import { Router, Link, Route } from "svelte-routing";
  import Icon from "fa-svelte";
  import { faCube, faLink } from "@fortawesome/free-solid-svg-icons";
  import { getTotalHeroes } from "../heroes/hero.store.js";
  import { getTotalVillains } from "../villains/villain.store.js";

  let navIsCollapse = true;

  onMount(() => {});

  function toggleNavBar() {
    navIsCollapse = !navIsCollapse;
  }
</script>

<style>
  .computed {
    margin: 1rem;
    color: whitesmoke;
    font-size: 24px;
  }

  .btn:focus {
    box-shadow: none;
  }
</style>

<nav class="flex items-center justify-between flex-wrap bg-gray-800 p-6">
  <div class="flex items-center flex-shrink-0 text-white mr-6">
    <Icon
      icon={faCube}
      class="fill-current h-8 w-8 mr-2"
      width="54"
      height="54"
      viewBox="0 0 54 54" />
    <span class="font-semibold text-xl tracking-tight">
      Svelte Tour of Hereoes
    </span>
  </div>

  <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-sm lg:flex-grow">
      <Link to="/">
        <span
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200
          hover:text-white mr-4">
          Heroes
        </span>
      </Link>
      <Link to="/villains">
        <span
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200
          hover:text-white mr-4">
          Villains
        </span>
      </Link>
    </div>
    <div class="flex flex-row flex-no-wrap">
      <span class="computed">Total heroes: {$getTotalHeroes}</span>
      <span class="computed">Total villains: {$getTotalVillains}</span>
    </div>
    <div>
      <a
        href="https://github.com/webmasterdevlin"
        class="inline-block text-sm px-4 py-2 leading-none border rounded
        text-white border-white hover:border-transparent hover:text-teal-500
        hover:bg-white mt-4 lg:mt-0">
        <Icon icon={faLink} />
        <span>Github</span>
      </a>
    </div>

    <div>
      <a
        href="https://twitter.com/DevlinDuldulao"
        class="inline-block text-sm px-4 py-2 leading-none border rounded
        text-white border-white hover:border-transparent hover:text-teal-500
        hover:bg-white mt-4 lg:mt-0">
        <Icon icon={faLink} />
        <span>Twitter</span>
      </a>
    </div>
  </div>
</nav>
