import { writable, readable, derived, get } from "svelte/store";
import {
  getVillains,
  getVillainById,
  deleteVillain,
  putVillain,
  postVillain
} from "./villain.service";

const initialState = {
  villains: [],
  villain: {
    id: "",
    firstName: "",
    lastName: "",
    house: "",
    knownAs: ""
  },
  isLoading: false,
  error: ""
};
function createVillainStore() {
  const { subscribe, update, set } = writable(initialState);

  return {
    subscribe,
    loadVillains: async () => {
      update(state => (state = { ...state, isLoading: true }));
      try {
        const res = (await getVillains()).data;
        update(state => (state = { ...state, villains: res }));
      } catch (e) {
        alert(e.message);
      } finally {
        update(state => (state = { ...state, isLoading: false }));
      }
    },

    loadVillainById: async id => {
      update(state => (state = { ...state, isLoading: true }));
      try {
        const res = (await getVillainById(id)).data;
        update(state => (state = { ...state, villain: res }));
      } catch (e) {
        alert(e.message);
      } finally {
        update(state => (state = { ...state, isLoading: false }));
      }
    },

    createVillain: async newVillain => {
      update(state => (state = { ...state, isLoading: true }));
      try {
        const res = (await postVillain(newVillain)).data;
        update(
          state => (state = { ...state, villains: [...state.villains, res] })
        );
      } catch (e) {
        alert(e.message);
      } finally {
        update(state => (state = { ...state, isLoading: false }));
      }
    },

    /* Optimistic UI update. Updating the UI before sending the request to the web service */
    removeVillain: async id => {
      const confirmation = confirm("You sure you want to delete this?");
      if (!confirmation) return;

      let previousVillains;
      update(state => {
        previousVillains = state.villains;
        const updatedVillains = state.villains.filter(h => h.id !== id);
        return (state = { ...state, villains: updatedVillains }); // need to return the state only
      });
      try {
        await deleteVillain(id);
      } catch (e) {
        alert(e.message);
        update(state => (state = { ...state, villains: previousVillains }));
      }
    },

    updateVillain: async updatedVillain => {
      update(state => (state = { ...state, isLoading: true }));
      try {
        await putVillain(updatedVillain);
        update(state => {
          const index = state.villains.findIndex(
            h => h.id === updatedVillain.id
          );
          const copyOfVillains = state.villains;
          copyOfVillains[index] = updatedVillain;
          return (state = {
            ...state,
            villains: copyOfVillains
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

export const villainStore = createVillainStore();
/* computed values */
export const getTotalVillains = derived(
  villainStore,
  $villainStore => $villainStore.villains.length
);
