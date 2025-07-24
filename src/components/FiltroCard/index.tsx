import { useDispatch, useSelector } from 'react-redux'
import * as S from './styles'
import * as enums from '../../utils/enums/Tarefa'
import { alterarFiltro } from '../../store/reducers/filtro'

import { RootReducer } from '../../store'

export type Props = {
  legenda: string
  criterio: 'status' | 'prioridade' | 'todas'
  valor?: enums.Status | enums.Prioridade
}

const FiltroCard = ({ legenda, criterio, valor }: Props) => {
  const dispatch = useDispatch()
  const { filtro, tarefas } = useSelector((state: RootReducer) => state)

  const verificaEstaAtivo = () => {
    const mesmoCriterio = filtro.criterio === criterio
    const mesmoValor = filtro.valor === valor

    return mesmoCriterio && mesmoValor
  }

  const contarTarefas = () => {
    if (criterio === 'todas') return tarefas.itens.length
    if (criterio === 'status') {
      return tarefas.itens.filter((item) => item.status === valor).length
    }
    if (criterio === 'prioridade') {
      return tarefas.itens.filter((item) => item.prioridade === valor).length
    }
  }

  const filtra = () => {
    dispatch(
      alterarFiltro({
        criterio,
        valor,
        termo: ''
      })
    )
  }
  const contador = contarTarefas()
  const ativo = verificaEstaAtivo()
  return (
    <S.Card ativo={ativo} onClick={filtra}>
      <S.Contador>{contador}</S.Contador>
      <S.label>{legenda}</S.label>
    </S.Card>
  )
}

export default FiltroCard
