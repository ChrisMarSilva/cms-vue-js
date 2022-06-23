<template>
  <h1>Você está no País: {{ pais.nome }}</h1>
</template>

<script>
export default {
  name: 'PaisesPage',
  validade ({ params }) {
    return /^\d+$/.test(params.pais)
  },
  asyncData ({ params }) {
    const idPais = +params.paises
    const paises = [
      { id: 1, nome: 'Angola' },
      { id: 2, nome: 'Brasil' },
      { id: 3, nome: 'Cabo Verde' },
      { id: 4, nome: 'Portugal' }
    ]
    const pais = paises.find(x => x.id === idPais)
    return {
      pais
    }
  }
}
</script>
