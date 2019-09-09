<script>

</script>

<style>
  .lds-ripple {
    display: inline-block;
    position: relative;
    width: 128px;
    height: 128px;
  }
  .lds-ripple div {
    position: absolute;
    border: 4px solid magenta;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: 56px;
      left: 56px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: -1px;
      left: -1px;
      width: 116px;
      height: 116px;
      opacity: 0;
    }
  }
</style>

<div
  class="text-4xl text-pink-900"
  style="display: flex; flex-direction: column; place-items: center;
  place-content: center">
  <div class="lds-ripple">
    <div />
    <div />
  </div>
</div>
