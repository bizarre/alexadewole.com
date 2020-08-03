<template>
  <div class="w-full flex">
    <div class="p-4 w-full md:w-2/3 md:m-auto md:px-0 md:pt-40">
      <transition name="fade" appear>
        <main>
          <slot/>
        </main>
      </transition>
    </div>
  </div>
</template>
