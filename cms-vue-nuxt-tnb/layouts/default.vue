<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        { icon: 'mdi-apps', title: 'Welcome', to: '/' },
        { icon: 'mdi-chart-bubble', title: 'Inspire', to: '/inspire' },
        { icon: 'mdi-earth', title: 'Paises', to: '/paises' },
        { icon: 'mdi-earth', title: 'Favoritos', to: '/favorito' },
        { icon: 'mdi-earth', title: 'Home', to: '/home' },
        { icon: 'mdi-earth', title: 'Contato', to: '/contato' },
        { icon: 'mdi-earth', title: 'Criar Conta', to: '/usuario_criar_conta' },
        { icon: 'mdi-earth', title: 'Criar Conta - sucesso', to: '/usuario_sucesso' },
        { icon: 'mdi-earth', title: 'Criar Conta - ativacao', to: '/usuario_ativacao' },
        { icon: 'mdi-earth', title: 'Entrar', to: '/login' },
        { icon: 'mdi-earth', title: 'Esqueceu a senha', to: '/usuario_esqueceu_senha' },
        { icon: 'mdi-earth', title: 'Esqueceu a senha - redefinir', to: '/usuario_redefinir_senha' },
        { icon: 'mdi-earth', title: 'Esqueceu a senha - erro', to: '/usuario_erro_redefinir_senha' },
        { icon: 'mdi-earth', title: 'Esqueceu a senha - sucesso', to: '/usuario_sucesso_redefinir_senha' },
        { icon: 'mdi-earth', title: 'Principal', to: '/principal' },
        { icon: 'mdi-earth', title: 'Portfólio', to: '/portfolio' },
        { icon: 'mdi-earth', title: 'Portfólio - Valorizacao', to: '/valorizacao' },
        { icon: 'mdi-earth', title: 'Operações', to: '/operacoes' },
        { icon: 'mdi-earth', title: 'Proventos', to: '/proventos' },
        { icon: 'mdi-earth', title: 'Análise', to: '/analise' },
        { icon: 'mdi-earth', title: 'Apuração', to: '/apuracao' },
        { icon: 'mdi-earth', title: 'IRPF', to: '/irpf' },
        { icon: 'mdi-earth', title: 'Finan', to: '/finan_acoes' },
        { icon: 'mdi-earth', title: 'Finan Ações', to: '/finan_acoes_codigo' },
        { icon: 'mdi-earth', title: 'Fatos', to: '/fatos' },
        { icon: 'mdi-earth', title: 'Calendário', to: '/calendario' },
        { icon: 'mdi-earth', title: 'Comentários', to: '/comentarios' },
        { icon: 'mdi-earth', title: 'Perfil', to: '/perfil' },
        { icon: 'mdi-earth', title: 'Corretora', to: '/corretora' },
        { icon: 'mdi-earth', title: 'Aluguel', to: '/aluguel' },
        { icon: 'mdi-earth', title: 'Nota de Corretagem', to: '/nota' },
        { icon: 'mdi-earth', title: 'Radar', to: '/radar' },
        { icon: 'mdi-earth', title: 'Admin - AÇÃO', to: '/admin_empresa' },
        { icon: 'mdi-earth', title: 'Admin - AÇÃO Cotação', to: '/admin_empresa_cotacao' },
        { icon: 'mdi-earth', title: 'Admin - AÇÃO Proventos', to: '/admin_empresa_proventos' },
        { icon: 'mdi-earth', title: 'Admin - FII', to: '/admin_fundoimob' },
        { icon: 'mdi-earth', title: 'Admin - FII Cotação', to: '/admin_fundoimob_cotacao' },
        { icon: 'mdi-earth', title: 'Admin - FII Proventos', to: '/admin_fundoimob_proventos' },
        { icon: 'mdi-earth', title: 'Admin - ETF', to: '/admin_etf' },
        { icon: 'mdi-earth', title: 'Admin - BDR', to: '/admin_bdr' },
        { icon: 'mdi-earth', title: 'Admin - CRIPTO', to: '/admin_cripto' },
        { icon: 'mdi-earth', title: 'Admin - Investidor', to: '/admin_investidor' },
        { icon: 'mdi-earth', title: 'Admin - Investidor Logs', to: '/admin_investidor_log' },
        { icon: 'mdi-earth', title: 'Admin - Alertas', to: '/admin_alerta' },
        { icon: 'mdi-earth', title: 'Admin - Erros', to: '/admin_log_erros' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
