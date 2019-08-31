import { writable, readable, derived, get } from "svelte/store";
import {
  getHeroes,
  getHeroById,
  deleteHero,
  putHero,
  postHero
} from "./hero.service";

const initialState = {
  heroes: [],
  hero: {
    id: "",
    firstName: "",
    lastName: "",
    house: "",
    knownAs: ""
  },
  isLoading: false,
  error: ""
};
function createHeroStore() {
  const { subscribe, update, set } = writable(initialState);

  return {
    subscribe,
    loadHeroes: async () => {
      update(state => (state = { ...state, isLoading: true }));
      try {
        const res = (await getHeroes()).data;
        update(state => (state = { ...state, heroes: res }));
      } catch (e) {
        alert(e.message);
      } finally {
        update(state => (state = { ...state, isLoading: false }));
      }
    },

    loadHeroById: async id => {
      update(state => (state = { ...state, isLoading: true }));
      try {
        const res = (await getHeroById(id)).data;
        update(state => (state = { ...state, hero: res }));
      } catch (e) {
        console.log(e.message);
        alert(e.message);
      }
      update(state => (state = { ...state, isLoading: false }));
    },

    createHero: async newHero => {
      update(state => (state = { ...state, isLoading: true }));
      try {
        const res = (await postHero(newHero)).data;
        update(state => (state = { ...state, heroes: [...state.heroes, res] }));
      } catch (e) {
        alert(e.message);
      } finally {
        update(state => (state = { ...state, isLoading: false }));
      }
    },

    removeHero: async id => {
      const confirmation = confirm("You sure you want to delete this?");
      if (!confirmation) return;

      let previousHeroes;
      update(state => {
        previousHeroes = state.heroes;
        const updatedHeroes = state.heroes.filter(h => h.id !== id);
        return (state = { ...state, heroes: updatedHeroes }); // need to return the state only
      });
      try {
        await deleteHero(id);
      } catch (e) {
        alert(e.message);
        update(state => (state = { ...state, heroes: previousHeroes }));
      }
    },

    updateHero: async updatedHero => {
      update(state => (state = { ...state, isLoading: true }));
      try {
        await putHero(updatedHero);
        update(state => {
          const index = state.heroes.findIndex(h => h.id === updatedHero.id);
          const copyOfHeroes = state.heroes;
          copyOfHeroes[index] = updatedHero;
          return (state = {
            ...state,
            heroes: copyOfHeroes
          });
        });
      } catch (e) {
        alert(e.message);
      } finally {
        update(state => (state = { ...state, isLoading: false }));
      }
    }
  };
}

export const heroStore = createHeroStore();

/* computed values */
export const getTotalHeroes = derived(
  heroStore,
  $heroStore => $heroStore.heroes.length
);
