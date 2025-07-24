import BotaoAdicionar from '../../components/BotaoAdicionar'
import BarraLateral from '../../containers/BarraLateral'
import ListaDeTarefas from '../../containers/ListaDeTarrefas'

const Home = () => (
  <>
    <BarraLateral mostrarFiltro />
    <ListaDeTarefas />
    <BotaoAdicionar />
  </>
)

export default Home
