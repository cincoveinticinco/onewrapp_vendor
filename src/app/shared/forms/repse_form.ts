import { IForm } from "../interfaces/form";
import { TypeInputForm } from "../interfaces/input_form";

export enum SECTIONS_REPSE_FORM{
  Main = 'main',
}

export const REPSE_FORM: IForm = {
  description: '',
  sections: [
    {
      key: 'main',
      title: null,
      visible: true,
      inputs: [
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'TIS PRODUCTIONS MÉXICO S DE RL DE CV (en adelante “TIS”) está comprometida con el respeto a las leyes y los negocios responsables, por lo que el apoyo de nuestros clientes, proveedores, contratistas y contrapartes en el cumplimiento de este compromiso es fundamental. Apreciada contraparte el llenado del presente formulario nos permite realizar el proceso de conocimiento de contrapartes y debida diligencia de acuerdo con nuestras políticas corporativas.',
          align: '',
          disabled: false
        },
        {
          label: '¿Los Servicios los presta a través de sus empleados o trabajadores? Para el caso de arrendamiento de equipo ¿el equipo lo opera a través de sus empleados o trabajadores?',
          visible: true,
          type: TypeInputForm.ChooseOption,
          size: 8,
          data: 'servicios_actividades',
          disabled: false
        },
        {
          label: '¿Los Servicios los presta en sus instalaciones? Para el caso de arrendamiento, ¿el equipo se operará en sus instalaicones?',
          visible: true,
          type: TypeInputForm.ChooseOption,
          size: 8,
          data: 'servicios_instalaciones',
          disabled: false
        },
        {
          label: '¿Requiere visitar periódicamente las instalaciones de TIS (locaciones, foros u oficinas) para prestar sus servicios u operar los equipos rentados?',
          visible: true,
          type: TypeInputForm.ChooseOption,
          size: 8,
          data: 'visita_instalaciones',
          disabled: false
        },
        {
          label: '¿Esta registrado en el REPSE?',
          visible: true,
          type: TypeInputForm.ChooseOption,
          size: 8,
          data: 'registrado_repse',
          disabled: false
        },
        {
          type: TypeInputForm.File,
          label: 'Adjuntar Inscripción REPSE',
          visible: false,
          data: 'inscripcion_repse_file',
          disabled: false,
          required: true
        },
        {
          type: TypeInputForm.File,
          label: 'Adjuntar Inscripción REPSE',
          visible: false,
          data: 'registro_IMSS',
          disabled: false,
          required: true
        },
      ]
    }
  ]
}
