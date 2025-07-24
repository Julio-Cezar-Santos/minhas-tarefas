import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as enums from '../../utils/enums/Tarefa'
import Tarefas from '../../models/Tarefas'

type TarefasState = {
  itens: Tarefas[]
}

const initialState: TarefasState = {
  itens: [
    {
      id: 1,
      titulo: 'Estudar Typescript',
      descricao: 'Ver a documentação do Typescript',
      prioridade: enums.Prioridade.IMPORTANTE,
      status: enums.Status.PENDENTE
    },
    {
      id: 2,
      titulo: 'Pagar a conta de luz',
      descricao: 'baixar o boleto no site da Enel',
      prioridade: enums.Prioridade.URGENTE,
      status: enums.Status.CONCLUIDA
    },
    {
      id: 3,
      titulo: 'Ir para a academia',
      descricao: 'Treinar perna e abdômen',
      prioridade: enums.Prioridade.NORMAL,
      status: enums.Status.PENDENTE
    }
  ]
}

const tarefasSlice = createSlice({
  name: 'tarefas',
  initialState,

  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter((tarefa) => tarefa.id !== action.payload)
    },
    editar: (state, action: PayloadAction<Tarefas>) => {
      const indexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )

      if (indexDaTarefa !== -1) {
        state.itens[indexDaTarefa] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Tarefas, 'id'>>) => {
      const tarefaExistente = state.itens.find(
        (t) =>
          t.titulo.toLocaleLowerCase() ===
          action.payload.titulo.toLocaleLowerCase()
      )
      if (tarefaExistente) {
        alert('Já existe uma tarefa com esse título')
      } else {
        const ultimaTarefa = state.itens[state.itens.length - 1]
        const novaTarefa: Tarefas = {
          ...action.payload,
          id: ultimaTarefa ? ultimaTarefa.id + 1 : 1
        }
        state.itens.push(novaTarefa)
      }
    },
    alteraStatus: (
      state,
      action: PayloadAction<{ id: number; finalizado: boolean }>
    ) => {
      const indexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )

      if (indexDaTarefa >= 0) {
        state.itens[indexDaTarefa].status = action.payload.finalizado
          ? enums.Status.CONCLUIDA
          : enums.Status.PENDENTE
      }
    }
  }
})

export const { remover, editar, cadastrar, alteraStatus } = tarefasSlice.actions
export default tarefasSlice.reducer
