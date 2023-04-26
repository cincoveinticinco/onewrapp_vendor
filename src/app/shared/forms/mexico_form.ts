import { IForm } from "../interfaces/form";
import { TypeInputForm } from "../interfaces/input_form";

export enum TYPE_PERSON_MEXICO{
  Fisica = 3,
  Moral = 4
}

export enum SECTIONS_MEXICO_FORM{
  Main = 'main',
  INFORMACION_BASICA = 'informacion_basica',
  INFORMACION_REPRESENTANTES_LEGALES = 'informacion_representantes_legales',
  INFORMACION_JUNTA_DIRECTIVA = 'informacion_junta_directiva',
  INFORMACION_ACCIONISTAS = 'informacion_accionistas',
  INFORMACION_BENEFICIARIOS_FINALES = 'informacion_beneficiarios_finales',
  DECLARACIONES = 'declaraciones',
  ANEXOS = 'anexos',
}

export const MEXICO_FORM: IForm = {
  description: '',
  sections: [
    {
      key: 'main',
      title: null,
      visible:true,
      inputs: [
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          disabled: false,
          content: 'TIS PRODUCTIONS MÉXICO S DE RL DE CV (en adelante "TIS") está comprometida con el respeto a las leyes y los negocios responsables, por lo que el apoyo de nuestros clientes, proveedores, contratistas y contrapartes en el cumplimiento de este compromiso es fundamental. Apreciada contraparte el llenado del presente formulario nos permite realizar el proceso de conocimiento de contrapartes y debida diligencia de acuerdo con nuestras políticas corporativas.'
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          disabled: false,
          content: 'Por favor tener presente las siguientes consideraciones:'
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          disabled: false,
          content: 'Personas físicas: firmar el documento  y estar acompañado de copia de los documentos requeridos en el punto VII "Anexos".'
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          disabled: false,
          content: 'Personas morales: el formulario debe ser firmado por el representante legal y estar acompañado de copia de los documentos requeridos en el punto VII "Anexos". '
        },
        {
          label: 'Tipo de Solicitud',
          visible: true,
          type: TypeInputForm.Text,
          disabled: true,
          size: 3,
          data: 'tipo_solicitud',
          required: true,
        },
        {
          label: 'Fecha de Solicitud',
          visible: true,
          type: TypeInputForm.Date,
          disabled: true,
          size: 3,
          data: 'created_at',
          required: true,
        }
      ]
    },
    {
      key: 'informacion_basica',
      title: 'INFORMACIÓN BÁSICA',
      visible: true,
      inputs: [
        {
          label: 'Tipo contraparte',
          visible: true,
          type: TypeInputForm.SelectBox,
          size: 4,
          break: true,
          data: 'f_vendor_type_id',
          required: true,
          options_key: 'tipo_contraparte',
          disabled: false
        },
        {
          label: 'Tipo Persona',
          visible: true,
          type: TypeInputForm.SelectBox,
          size: 2,
          data: 'f_person_type_id',
          required: true,
          options_key: 'tipo_persona',
          disabled: true,
        },
        {
          visible: true,
          type: TypeInputForm.Document,
          size: 4,
          data: 'document',
          data_list: ['f_document_type_id', 'document'],
          options_key_list: ['tipo_persona'],
          required: true,
          options_key: 'tipo_id',
          disabled: false
        },
        /*{
          label: 'Tipo ID',
          visible: true,
          type: TypeInputForm.SelectBox,
          size: 2,
          data: 'f_document_type_id',
          required: true,
          options_key: 'tipo_id',
          disabled: false
        },
        /*{
          label: 'Número de ID',
          visible: true,
          type: TypeInputForm.Text,
          size: 2,
          data: 'document',
          required: true,
          disabled: false
        },*/
        {
          label: 'Fecha matrícula o expedición ID',
          visible: true,
          type: TypeInputForm.Date,
          size: 2,
          data: 'expedition_date',
          required: true,
          disabled: false
        },
        {
          label: 'Nombre o Razón Social',
          visible: true,
          type: TypeInputForm.Text,
          size: 8,
          data: 'name',
          required: true,
          disabled: false
        },
        {
          label: 'Dirección',
          visible: true,
          type: TypeInputForm.Text,
          size: 5,
          data: 'address',
          required: true,
          disabled: false
        },
        {
          label: 'Oficina / Apto / Suite / Etc',
          visible: true,
          type: TypeInputForm.Text,
          size: 3,
          data: 'info_add_address',
          required: false,
          disabled: false
        },
        {
          label: 'Pais',
          visible: true,
          type: TypeInputForm.Text,
          size: 2,
          data: 'country',
          required: true,
          disabled: false
        },
        {
          label: 'Estado',
          visible: true,
          type: TypeInputForm.Text,
          size: 2,
          data: 'department',
          required: true,
          disabled: false
        },
        {
          label: 'Ciudad',
          visible: true,
          type: TypeInputForm.Text,
          size: 2,
          data: 'city',
          required: true,
          disabled: false
        },
        {
          label: 'Teléfono',
          visible: true,
          type: TypeInputForm.Text,
          size: 2,
          data: 'telephone',
          required: true,
          disabled: false
        },
        {
          label: 'Correo electrónico',
          visible: true,
          type: TypeInputForm.Email,
          size: 3,
          data: 'email',
          required: true,
          disabled: false
        },
        {
          label: 'Página web',
          visible: true,
          type: TypeInputForm.Text,
          size: 3,
          data: 'web_site',
          required: true,
          disabled: false
        },
        {
          label: 'Actividad economica',
          visible: true,
          type: TypeInputForm.Text,
          size: 3,
          data: 'actividad_economica',
          required: true,
          disabled: false
        },
        {
          label: '¿Pertenece a un grupo empresarial?',
          visible: true,
          type: TypeInputForm.ChooseOption,
          size: 8,
          data: 'business_group',
          required: true,
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          data: 'p_pertenece_grupo_empresarial',
          content: 'Indicar las empresas que lo conforman y la calidad que ostentan dentro del grupo, esto es, si es matriz (M), filial (F) o subsidiaria (S):',
          align: '',
          disabled: false
        },
        {
          type: TypeInputForm.ArrayGroup,
          visible: true,
          addButonText: 'AGREGAR OTRA EMPRESA',
          data: 'otras_empresas',
          required: true,
          disabled: false,
          children: [
            {
              label: 'Nombre o Razón Social',
              visible: true,
              type: TypeInputForm.Text,
              size: 3,
              data: 'name',
              required: true,
              disabled: false
            },
            {
              visible: true,
              type: TypeInputForm.Document,
              size: 4,
              data: 'document',
              data_list: ['f_document_type_id', 'document'],
              options_key_list: ['tipo_persona'],
              required: true,
              options_key: 'tipo_id',
              disabled: false
            },
            /*
            {
              label: 'Tipo ID',
              visible: true,
              type: TypeInputForm.SelectBox,
              size: 1,
              data: 'f_document_type_id',
              required: true,
              options_key: 'moral_id',
              disabled: false
            },
            {
              label: 'Número de ID',
              visible: true,
              type: TypeInputForm.Text,
              size: 2,
              data: 'document',
              required: true,
              disabled: false
            },*/
            {
              label: 'Calidad',
              visible: true,
              type: TypeInputForm.SelectBox,
              size: 1,
              data: 'quantity',
              required: true,
              options_key: 'calidad',
              disabled: false
            },
          ]
        },


      ]
    },
    {
      key: 'informacion_representantes_legales',
      title: 'INFORMACIÓN REPRESENTANTES LEGALES',
      label: 'Información Representantes Legales',
      visible: true,
      inputs: [{
        type: TypeInputForm.ArrayGroup,
        visible: true,
        data: 'informacion_representantes_legales',
        required: true,
        addButonText: 'AGREGAR REPRESENTANTE',
        disabled: false,
        children: [
          {
            label: 'Nombres',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            data: 'name',
            required: true,
            disabled: false
          },
          {
            label: 'Apellidos',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            data: 'last_name',
            required: true,
            disabled: false
          },
          {
            visible: true,
            type: TypeInputForm.Document,
            size: 4,
            data: 'document',
            data_list: ['f_document_type_id', 'document'],
            options_key_list: ['tipo_persona'],
            required: true,
            options_key: 'tipo_id',
            disabled: false
          },
          /*
          {
            label: 'Tipo ID',
            visible: true,
            type: TypeInputForm.SelectBox,
            size: 1,
            data: 'f_document_type_id',
            required: true,
            options_key: 'fisica_id',
            disabled: false
          },
          {
            label: 'Número de ID',
            visible: true,
            type: TypeInputForm.Text,
            size: 3,
            data: 'document',
            required: true,
            disabled: false,
          },
          */
          {
            label: 'Fecha expedición ID',
            visible: true,
            type: TypeInputForm.Date,
            size: 2,
            data: 'expedition_date',
            required: true,
            disabled: false
          },
          {
            label: 'Pais Domicilio',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            data: 'country',
            required: true,
            disabled: false
          },
          {
            label: 'Estado',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            data: 'department',
            required: true,
            disabled: false
          },
          {
            label: 'Ciudad',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            data: 'city',
            required: true,
            disabled: false
          },
          {
            label: 'Correo electrónico',
            visible: true,
            type: TypeInputForm.Email,
            size: 4,
            data: 'email',
            required: true,
            break: true,
            disabled: false
          }
        ]
      }
    ]
    },
    {
      key: 'informacion_junta_directiva',
      title: 'INFORMACIÓN JUNTA DIRECTIVA, CONSEJO DE ADMINISTRACIÓN O EQUIVALENTE',
      label: 'Información Junta Directiva',
      visible: true,
      inputs: [{
        type: TypeInputForm.ArrayGroup,
        visible: true,
        addButonText: 'AGREGAR MIEMBRO',
        disabled: false,
        data: 'informacion_junta_directiva',
        required: true,
        children: [
          {
            label: 'Nombres',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            disabled: false,
            data: 'name',
            required: true,
          },
          {
            label: 'Apellidos',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            disabled: false,
            data: 'last_name',
            required: true,
          },
          {
            visible: true,
            type: TypeInputForm.Document,
            size: 4,
            data: 'document',
            data_list: ['f_document_type_id', 'document'],
            options_key_list: ['tipo_persona'],
            required: true,
            options_key: 'tipo_id',
            disabled: false
          },
          /*
          {
            label: 'Tipo ID',
            visible: true,
            type: TypeInputForm.SelectBox,
            size: 1,
            disabled: false,
            options_key: 'fisica_id',
            data: 'f_document_type_id',
            required: true,
          },
          {
            label: 'Número de ID',
            visible: true,
            type: TypeInputForm.Text,
            size: 3,
            disabled: false,
            data: 'document',
            required: true,
          },
          */
          {
            label: 'Fecha expedición ID',
            visible: true,
            type: TypeInputForm.Date,
            size: 2,
            disabled: false,
            data: 'expedition_date',
            required: true,
          },
          {
            label: 'Pais Domicilio',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            disabled: false,
            data: 'country',
            required: true,
          },
          {
            label: 'Estado',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            disabled: false,
            data: 'department',
            required: true,
          },
          {
            label: 'Ciudad',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            disabled: false,
            data: 'city',
            required: true,
          },
          {
            label: 'Correo electrónico',
            visible: true,
            type: TypeInputForm.Email,
            size: 4,
            disabled: false,
            data: 'email',
            required: true,
            break: true
          },

        ]
      }
    ]
    },
    {
      key: 'informacion_accionistas',
      title: 'INFORMACIÓN ACCIONISTAS Y/O SOCIOS',
      label: 'Información Accionistas Y/O Socios',
      visible: true,
      inputs: [
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'Personas físicas y morales con participación igual o superior al cinco por ciento (5%)',
          disabled: false,
          align: ''
        },
        {
          type: TypeInputForm.ArrayGroup,
          visible: true,
          addButonText: 'AGREGAR OTRO',
          disabled: false,
          data: 'informacion_accionistas',
          required: true,
          children: [
            {
              label: 'Tipo persona',
              visible: true,
              type: TypeInputForm.SelectBox,
              size: 2,
              disabled: false,
              data: 'f_person_type_id',
              required: true,
              options_key: 'tipo_persona',
            },
            {
              label: 'Nombre o Razón Social',
              visible: true,
              type: TypeInputForm.Text,
              size: 4,
              disabled: false,
              data: 'name',
              required: true,
            },
            {
              label: '% Participación',
              visible: true,
              type: TypeInputForm.Percentage,
              size: 2,
              disabled: false,
              data: 'percente_participation',
              required: true,
            },
            {
              visible: true,
              type: TypeInputForm.Document,
              size: 4,
              data: 'document',
              data_list: ['f_document_type_id', 'document'],
              options_key_list: ['tipo_persona'],
              required: true,
              options_key: 'tipo_id',
              disabled: false
            },

            /*
            {
              label: 'Tipo ID',
              visible: true,
              type: TypeInputForm.SelectBox,
              size: 2,
              disabled: false,
              options_key: 'todos_tipo_id',
              data: 'f_document_type_id',
              required: true,
            },
            {
              label: 'Número de ID',
              visible: true,
              type: TypeInputForm.Text,
              size: 2,
              disabled: false,
              data: 'document',
              required: true,
            },
            */


            {
              label: 'Fecha matrícula o expedición ID',
              visible: true,
              type: TypeInputForm.Date,
              size: 2,
              disabled: false,
              data: 'expedition_date',
              required: true,
            },
            {
              label: 'Pais Domicilio',
              visible: true,
              type: TypeInputForm.Text,
              size: 2,
              disabled: false,
              data: 'country',
              required: true,
            },
          ]
        }
      ]
    },
    {
      key: 'informacion_beneficiarios_finales',
      title: 'INFORMACIÓN COMPLEMENTARIA DE BENEFICIARIOS FINALES',
      label: 'Información Complementaria Beneficiarios',
      visible: true,
      inputs: [
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'Si alguno de los accionistas y/o socios con participación superior o igual al cinco por ciento (5%) es una persona moral, indicar en el presente capitulo la información de la persona o personas físicas (Beneficiario Final). Se considerará Beneficiario Final: 1) Persona física que, actuando individual o conjuntamente, sea titular, directa o indirectamente, del cinco por ciento (5%), o más del capital o los derechos de voto de la persona moral y/o se beneficie en cinco por ciento (5%), o más de los activos, rendimientos o utilidades de la persona moral; y 2) Persona física que, actuando individual o conjuntamente, ejerza control sobre la persona moral, por cualquier otro medio diferente a los establecidos en el numeral anterior.',
          disabled: false,
          required: true,
          align: ''
        },
        {
          type: TypeInputForm.ArrayGroup,
          visible: true,
          fixElements: true,
          disabled: false,
          data: 'informacion_beneficiarios_finales',
          startEmpty: true,
          children: [
            {
              label: 'Tipo ID',
              visible: true,
              type: TypeInputForm.SelectBox,
              size: 2,
              disabled: true,
              readonly: true,
              options_key: 'todos_tipo_id',
              data: 'f_document_type_id',
              required: true,
            },
            {
              label: 'ID',
              visible: true,
              type: TypeInputForm.Text,
              size: 2,
              data: 'document',
              required: true,
              disabled: true
            },

            {
              label: 'Razón Social',
              visible: true,
              type: TypeInputForm.Text,
              size: 4,
              data: 'name',
              required: true,
              disabled: true
            },
            {
              type: TypeInputForm.ArrayGroup,
              visible: true,
              addButonText: 'AGREGAR BENIFICIARIO',
              data: 'informacion_beneficiarios_finales_people',
              required: true,
              disabled: false,
              children: [
                {
                  label: 'Tipo persona',
                  visible: true,
                  type: TypeInputForm.SelectBox,
                  size: 2,
                  disabled: false,
                  options_key: 'tipo_persona',
                  data: 'f_person_type_id',
                  required: true,
                },
                {
                  label: 'Nombre o Razón Social',
                  visible: true,
                  type: TypeInputForm.Text,
                  size: 6,
                  disabled: false,
                  data: 'name',
                  required: true,
                },
                {
                  visible: true,
                  type: TypeInputForm.Document,
                  size: 4,
                  data: 'document',
                  data_list: ['f_document_type_id', 'document'],
                  options_key_list: ['tipo_persona'],
                  required: true,
                  options_key: 'tipo_id',
                  disabled: false
                },
                /*
                {
                  label: 'Tipo ID',
                  visible: true,
                  type: TypeInputForm.SelectBox,
                  size: 1,
                  disabled: false,
                  options_key: 'todos_tipo_id',
                  data: 'f_document_type_id',
                  required: true,
                },
                {
                  label: 'Número de ID',
                  visible: true,
                  type: TypeInputForm.Text,
                  size: 2,
                  disabled: false,
                  data: 'document',
                  required: true,
                },
                /*{
                  label: 'DV',
                  visible: true,
                  type: TypeInputForm.SelectBox,
                  size: 1,
                  disabled: false,
                  options_key: 'verification_digit',
                  data: 'verification_digit',
                  required: true,
                },*/
                {
                  label: 'Fecha matrícula o expedición ID',
                  visible: true,
                  type: TypeInputForm.Date,
                  size: 3,
                  disabled: false,
                  data: 'expedition_date',
                  required: true,
                },
              ]
            }
          ]
        }
      ]
    },
    {
      key: 'declaraciones',
      title: 'DECLARACIONES',
      label: 'Declaraciones',
      visible: true,
      inputs: [
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'De manera voluntaria, obrando de buena fe y conforme a mi conocimiento actual declaro que:',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'De manera voluntaria, obrando de buena fe realizo las siguiente declaraciones:',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'i) Todo lo aquí consignado es cierto, veraz, correcto, exacto, actualizado, completo y comprobable,  admitiendo que cualquier omisión o inexactitud en estos documentos podrá ocasionar el rechazo de esta y la devolución de la documentación, como también la cancelación de mi inscripción o registro. Que informaré cualquier circunstancia que modifique la presente declaración y que actualizaré los datos e información personal y financiera que sean requeridos cuando se solicite al menos una vez por año.',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'ii) Mis ingresos o bienes o los de la persona jurídica que represento o los de sus representantes legales, miembros de junta directiva, empleados de cumplimiento, revisores fiscales, auditores externos, accionista y/o socios y beneficiarios finales, no provienen de ninguna actividad ilícita, incluyendo lavado de dinero, fraude, corrupción o soborno, contemplados en el Código Penal Federal o en cualquier norma o reglamento aplicable (los "Delitos"). En consecuencia, declaro que los ingresos o bienes están ligados al desarrollo normal de actividades lícitas propias del objeto social en el caso de personas jurídicas o del ejercicio de profesión u oficio en el caso de personas naturales. ',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'iii) Como persona física o que la persona moral que represento, sus representante legales, miembros de junta directiva, empleados de cumplimiento, revisores fiscales, auditores externos, accionista y/o socios y beneficiarios finales no han efectuado transacciones u operaciones destinadas a la realización o financiamiento de actividades ilícitas, incluyendo los Delitos.',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'iv) Como persona física o que la persona moral que represento, sus representante legales, miembros de junta directiva, empleados de cumplimiento, revisores fiscales, auditores externos, accionista y/o socios  y beneficiarios finales, no se encuentran en listas vinculantes para Mexico de conformidad con el derecho internacional (listas de las Naciones Unidas) o en la lista emitida por la Oficina de Activos Extranjeros del Departamento del Tesoro de los Estados Unidos (Lista OFAC), o en la lista de organizaciones terroristas emitida por el Consejo de Seguridad Nacional, así como en listas o bases de datos nacionales o internacionales relacionadas con actividades ilícitas, Fraude, Corrupción o Soborno (listas del Banco Mundial y del Banco Interamericano de Desarrollo), estando TIS autorizada o sus empresas relacionadas facultadas a efectuar las verificaciones que considere pertinentes en bases de datos, listas de control, o informaciones públicas nacionales o internacionales incluso mediante el uso de terceros, quienes pueden transferir y procesar dicha información, con el propósito de su verificación. ',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'v) No existe en mi contra o contra la persona moral que represento, ni en contra de sus representante legales, miembros de junta directiva, empleados de cumplimiento, revisores fiscales, auditores externos, accionista y/o socios y beneficiarios finales, una sentencia judicial en firme por la comisión de cualquiera de los Delitos; o que se encuentren vinculados a investigaciones penales por dichos Delitos, estando TIS facultada para efectuar las verificaciones que considere pertinentes en bases de datos y en informaciones públicas nacionales o internacionales para gestionar el riesgo legal o reputacional.',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'vi) He consultado el aviso de privacidad de TIS Productions México S. de R.L. de C.V.  (TIS) (https://www.tisproductions.com) (el Aviso de Privacidad), y por tanto reconozco haberlos leído y aceptado los términos dispuestos en los mismos, autorizando en este acto a TIS para que mis datos sean incorporados a una base de datos necesaria para el cumplimiento de las obligaciones de TIS, y cuyo responsable es TIS. Asimismo, TIS hace de su conocimiento el derecho de de acceder, rectificar, oponerse y en su caso, cancelar los datos de carácter personal, mediante petición expresa y por escrito a TIS.De igual forma, TIS como responsable de la base de datos, le garantiza a Usted, que resguardará sus datos personales, los cuales solamente podrán ser comunicados por TIS a un tercero, de conformidad con los términos dispuestos en el Aviso de Privacidad.',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'vii)',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'a. Como persona física o que la persona moral que represento, sus representante legales, miembros de junta directiva, empleados de cumplimiento, revisores fiscales, auditores externos, accionista y/o socios y beneficiarios finales, a la fecha de firma de este formulario, no tienen conflictos de intereses, y no poseen información que actualmente implique o que eventualmente pueda configurar una situación de conflicto de intereses con TIS, de la siguiente manera: - Ninguno de los anteriomente mencionados tienen relación de parentesco dentro del tercer grado de consanguinidad, primero de afinidad o primero civil, con algún empleado, directivo, administrador o accionista de TIS. - Ninguno de los anteriormente mencionados han sido parte ni son parte, en proceso judicial, administrativo, disciplinario o arbitral alguno o de cualquier otra índole, en el cual TIS, sus empleados, directivos, administradores o accionistas también sean parte, bien sea en su calidad de demandantes, demandados o llamados en garantía. - No conozco cualquier otra situación que pueda generar una situación de conflicto de intereses con TIS, además reconozco y acepto mi obligación de informar a TIS, cualquier situación que pueda configurar un conflicto de intereses con posterioridad a la fecha de firma del presente formulario.',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'b. Declaro los siguientes conflictos de intereses:',
          disabled: false
        },
        {
          label: '',
          visible: true,
          type: TypeInputForm.ChooseOption,
          size: 1,
          data: 'conflicto_intereses',
          required: true,
          disabled: false
        },
        {
          label: 'Describa cual',
          visible: true,
          type: TypeInputForm.Text,
          size: 7,
          data: 'desc_conflicto_intereses',
          required: true,
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'viii)',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'a. Algún tipo de vinculo con entidades estatales o de gobierno',
          disabled: false
        },
        {
          label: '',
          visible: true,
          type: TypeInputForm.ChooseOption,
          size: 1,
          data: 'vinculo_estatal',
          required: true,
          disabled: false
        },
        {
          label: 'Describa cual',
          visible: true,
          type: TypeInputForm.Text,
          size: 7,
          data: 'desc_vinculo_estatal',
          required: true,
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'b. Tiene familiares con algún vinculo con entidades estatales o de gobierno.',
          disabled: false
        },
        {
          label: '',
          visible: true,
          type: TypeInputForm.ChooseOption,
          size: 1,
          data: 'vinculo_familiar_estatal',
          required: true,
          disabled: false
        },
        {
          label: 'Describa cual parentesco',
          visible: true,
          type: TypeInputForm.Text,
          size: 7,
          data: 'desc_vinculo_familiar_estatal',
          required: true,
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'ix) a. ¿Dentro de los servicios que presta realiza alguna de las siguientes actividades: apuestas, otorgamiento de créditos o préstamos, intermediación en venta de inmuebles, comercialización de obras de arte, recepción de donativos?',
          disabled: false
        },
        {
          label: '',
          visible: true,
          type: TypeInputForm.ChooseOption,
          size: 1,
          data: 'servicios_actividades_prestados',
          required: true,
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'b. ¿Ha sido incluido en alguna lista de contribuyente incumplido o condonado por parte del SAT?',
          disabled: false
        },
        {
          label: '',
          visible: true,
          type: TypeInputForm.ChooseOption,
          size: 1,
          data: 'incluido_sat',
          required: true,
          disabled: false
        },
      ]
    },
    {
      key: 'anexos',
      title: 'ANEXOS',
      label: 'Anexos',
      visible: true,
      inputs: [
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'Por favor adjunte los siguientes archivos en formato PDF.',
          align: 'center',
          disabled: false
        },
        {
          type: TypeInputForm.File,
          label: 'Identificación oficial de la persona física o apoderado de persona moral.',
          visible: true,
          data: 'identificacion_oficial_file',
          required: true,
          disabled: false
        },
        {
          type: TypeInputForm.File,
          label: 'Copia de la inscripción al Registro Federal de Contribuyentes.',
          visible: true,
          data: 'inscripcion_registro_fed_file',
          required: true,
          disabled: false
        },
        {
          type: TypeInputForm.File,
          label: 'Constancia de cumplimiento de obligaciones fiscales (32D) con fecha de emisión no mayor a 1 mes.',
          visible: true,
          data: 'cumplimiento_obligaciones_file',
          required: true,
          disabled: false
        },
        {
          type: TypeInputForm.File,
          label: 'Acta constitutiva y poder notarial.',
          visible: true,
          data: 'acta_constitutiva_file',
          required: true,
          disabled: false
        },
        {
          type: TypeInputForm.File,
          label: 'Estado de cuenta bancario con fecha de emisión no mayor a 1 mes.',
          visible: true,
          data: 'estado_cuenta_bancaria_file',
          required: true,
          disabled: false
        },
        {
          type: TypeInputForm.File,
          label: 'Comprobante de domicilio, con fecha de emisión no mayor a 1 mes.',
          visible: true,
          data: 'comprobante_domicilio_file',
          required: true,
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'Descargue aquí el Formulario de Declaración de Cumplimiento de Políticas, Autorización de Tratamiento de Datos Personales y Autorización de Consulta y Reporte de TIS. Por favor fírmelo y luego súbalo.',
          textlink: 'aquí',
          data: 'documento_politicas_link',
          link: 'assets/files/declaracion_cumplimiento_politicas.pdf',
          align: '',
          disabled: false
        },
        {
          type: TypeInputForm.File,
          label: 'Formulario de Declaración de Cumplimiento de Políticas, Autorización de Tratamiento de Datos Personales y Autorización de Consulta y Reporte de TIS.',
          visible: true,
          size: 8,
          data: 'documento_politicas',
          required: true,
          disabled: false
        },
    ]
    }
  ]
}
