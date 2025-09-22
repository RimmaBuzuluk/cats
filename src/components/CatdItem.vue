<template>
  <div class="fact-card" @click="$emit('open', fact)">
    <div class="fact-image">
      <img :src="fact.image" alt="Cat" class="cat-photo" />
    </div>
    <div class="fact-content">
      <p :class="factClass">{{ fact.fact }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardItem",
  props: {
    fact: {
      type: Object,
      required: true
    }
  },
  computed: {
    factClass() {
      return this.fact.fact.length < 100 ? "short-fact" : "long-fact";
    }
  }
};
</script>

<style scoped>
.fact-card {
  background: white;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

body.dark-theme .fact-card  {
  background-color: #202020; 
}

.fact-card:hover {
  background: #ebecff;
}

.cat-photo {
  width: 100%;
  height: 254px;
  object-fit: cover;
  border-radius: 6px;
}

.fact-content p {
  margin: 16px;
  line-height: 22px;
}

.short-fact {
  font-size: 24px;
  font-weight: 700;
  color: #232323
}

.long-fact {
  font-size: 16px; 
  color: #434343;
  font-weight: 400;
  line-height: 22px;
}

body.dark-theme .long-fact,  body.dark-theme .short-fact {
  color: #ffffff
}
</style>