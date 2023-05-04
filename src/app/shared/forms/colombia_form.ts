import { IForm } from "../interfaces/form";
import { TypeInputForm } from "../interfaces/input_form";

export enum TYPE_PERSON_COLOMBIA{
  Natural = 1,
  Juridica = 2
}

export enum SECTIONS_COLOMBIA_FORM{
  Main = 'main',
  INFORMACION_BASICA = 'informacion_basica',
  INFORMACION_REPRESENTANTES_LEGALES = 'informacion_representantes_legales',
  INFORMACION_JUNTA_DIRECTIVA = 'informacion_junta_directiva',
  INFORMACION_ACCIONISTAS = 'informacion_accionistas',
  INFORMACION_BENEFICIARIOS_FINALES = 'informacion_beneficiarios_finales',
  INFORMACION_PERSONAS_EXPUESTAS = 'informacion_personas_expuestas',
  DECLARACIONES = 'declaraciones',
  ANEXOS = 'anexos',
}


export const COLOMBIA_FORM: IForm = {
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
          value: 'TIS PRODUCTIONS COLOMBIA SAS (en adelante “TIS”) está comprometida con el respeto a las leyes y los negocios responsables, por lo que el apoyo de nuestros clientes, proveedores, contratistas y contrapartes en el cumplimiento de este compromiso es fundamental. Apreciada contraparte el diligenciamiento del presente formulario nos permite realizar el proceso de conocimiento de contrapartes y debida diligencia, de acuerdo con la normativa legal vigente en materia de prevención de Lavado de Activos, Financiación del Terrorismo, Financiamiento de la Proliferación de Armas de Destrucción Masiva, Corrupción, Soborno Trasnacional o Fraude (en adelante “LA/FT/FPADM/C/ST/F”), donde exige que toda persona natural o jurídica que quiera tener o tenga algún tipo de vinculo con la Compañía debe suministrar los datos personales y empresariales que permitan tener una identificación, clara, transparente, confiable y total de la contraparte.'
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          disabled: false,
          value: 'Por favor tener presente las siguientes consideraciones:'
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          disabled: false,
          value: 'Personas naturales: firmar el documento  y estar acompañado de copia de los documentos requeridos en el punto VIII. ANEXOS.'
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          disabled: false,
          value: 'Personas jurídicas: el formulario debe ser firmado por el representante legal y estar acompañado de copia de los documentos requeridos en el punto VIII. ANEXOS. '
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
      label: 'Información Básica',
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
          dataDocumentType: 'f_document_type_id',
          dataDocumentVerification: 'verification_digit',
          dataDocumentPerson: 'f_person_type_id',
          options_key_list: ['tipo_persona'],
          required: true,
          options_key: 'tipo_id',
          disabled: false
        },
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
          label: 'Departamento',
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
          label: 'CIIU Principal',
          visible: true,
          type: TypeInputForm.SelectBox,
          size: 2,
          data: 'f_vendor_economic_act_id',
          required: true,
          options_key: 'ciiu',
          searching: false,
          disabled: false
        },
        {
          label: 'Actividad economica',
          visible: true,
          type: TypeInputForm.Text,
          size: 5,
          data: 'actividad_economica',
          required: true,
          readonly: true,
          disabled: false,
          break: true
        },
        {
          label: '¿Es una persona expuesta políticamente (PEP)?',
          visible: true,
          type: TypeInputForm.ChooseOption,
          size: 12,
          data: 'pep',
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
          value: 'Indicar las empresas que lo conforman y la calidad que ostentan dentro del grupo, esto es, si es matriz (M), filial (F) o subsidiaria (S):',
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
              dataDocumentType: 'f_document_type_id',
              dataDocumentVerification: 'verification_digit',
              dataDocumentPerson: 'f_person_type_id',
              options_key_list: ['tipo_persona'],
              required: true,
              options_key: 'juridica_id',
              disabled: false
            },
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
            dataDocumentType: 'f_document_type_id',
            dataDocumentVerification: 'verification_digit',
            dataDocumentPerson: 'f_person_type_id',
            options_key_list: ['tipo_persona'],
            required: true,
            options_key: 'tipo_id',
            disabled: false
          },
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
            label: 'Departamento',
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
          },
          {
            label: '¿Es una persona expuesta políticamente (PEP)?',
            visible: true,
            type: TypeInputForm.ChooseOption,
            size: 12,
            data: 'informacion_representantes_legales_pep',
            required: true,
            disabled: false
          },
        ]
      }
    ]
    },
    {
      key: 'informacion_junta_directiva',
      title: 'INFORMACIÓN JUNTA DIRECTIVA, CONSEJO DE ADMINISTRACIÓN O EQUIVALENTE',
      label: 'Información Junta Directiva',
      visible: true,
      inputs: [
        {
          label: '¿Tiene Junta Directiva, Consejo de Administración o equivalente?',
          visible: true,
          type: TypeInputForm.ChooseOption,
          size: 8,
          data: 'board_of_directors',
          required: true,
          disabled: false
        },
        {
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
            dataDocumentType: 'f_document_type_id',
            dataDocumentVerification: 'verification_digit',
            dataDocumentPerson: 'f_person_type_id',
            options_key_list: ['tipo_persona'],
            required: true,
            options_key: 'tipo_id',
            disabled: false
          },
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
            label: 'Departamento',
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
          {
            label: '¿Es una persona expuesta políticamente (PEP)?',
            visible: true,
            type: TypeInputForm.ChooseOption,
            size: 12,
            disabled: false,
            data: 'informacion_junta_directiva_pep',
            required: true,
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
          value: 'Personas naturales o jurídicas con participación igual o superior al cinco por ciento (5%)”',
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
              dataDocumentType: 'f_document_type_id',
              dataDocumentVerification: 'verification_digit',
              dataDocumentPerson: 'f_person_type_id',
              options_key_list: ['tipo_persona'],
              required: true,
              options_key: 'tipo_id',
              disabled: false
            },
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
            {
              label: '¿Es una persona expuesta políticamente (PEP)?',
              visible: true,
              type: TypeInputForm.ChooseOption,
              size: 12,
              disabled: false,
              data: 'informacion_accionistas_pep',
              dataVisible: true,
              required: true,
            },
            {
              visible: false,
              type: TypeInputForm.Text,
              size: 12,
              disabled: false,
              data: 'visible_informacion_accionistas_pep',
              required: false,
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
          value: 'Si alguno de los accionistas y/o socios con participación superior o igual al cinco por ciento (5%) es una persona jurídica, indicar en el presente capitulo la información de la persona o personas naturales Beneficiario Final. Se considerará Beneficiario Final: 1) Persona natural que, actuando individual o conjuntamente, sea titular, directa o indirectamente, del cinco por ciento (5%), o más del capital o los derechos de voto de la persona jurídica, y/o se beneficie en cinco por ciento (5%), o más de los activos, rendimientos o utilidades de la persona jurídica; y 2) Persona natural que, actuando individual o conjuntamente, ejerza control sobre la persona jurídica, por cualquier otro medio diferente a los establecidos en el numeral anterior',
          disabled: false,
          align: ''
        },
        {
          type: TypeInputForm.ArrayGroup,
          visible: true,
          fixElements: true,
          disabled: false,
          data: 'informacion_beneficiarios_finales',
          required: false,
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
              label: 'Tipo ID',
              visible: false,
              type: TypeInputForm.Hidden,
              size: 2,
              data: 'f_document_type_id',
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
                  dataDocumentType: 'f_document_type_id',
                  dataDocumentVerification: 'verification_digit',
                  dataDocumentPerson: 'f_person_type_id',
                  options_key_list: ['tipo_persona'],
                  required: true,
                  options_key: 'tipo_id',
                  disabled: false
                },
                {
                  label: 'Fecha matrícula o expedición ID',
                  visible: true,
                  type: TypeInputForm.Date,
                  size: 3,
                  disabled: false,
                  data: 'expedition_date',
                  required: true,
                },
                {
                  label: '¿Es una persona expuesta políticamente (PEP)?',
                  visible: true,
                  type: TypeInputForm.ChooseOption,
                  size: 12,
                  disabled: false,
                  dataVisible: true,
                  data: 'info_beneficiarios_persona_pep',
                  required: true,
                },
                {
                  visible: false,
                  type: TypeInputForm.Text,
                  size: 12,
                  disabled: false,
                  data: 'visible_info_beneficiarios_persona_pep',
                  required: false,
                },
              ]
            }
          ]
        }
      ]
    },
    {
      key: 'informacion_personas_expuestas',
      title: 'PERSONAS EXPUESTAS POLÍTICAMENTE',
      label: 'Personas Expuestas Políticamente',
      visible: true,
      inputs: [
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          value: 'Diligenciar la información de las personas que indicó, en apartados anteriores, ostentan la calidad de PEP “(…) Se considerarán como Personas Expuestas Políticamente (PEP) los servidores públicos de cualquier sistema de nomenclatura y clasificación de empleos de la administración pública nacional y territorial, cuando tengan asignadas o delegadas funciones de: expedición de normas o regulaciones, dirección general, formulación de políticas institucionales y adopción de planes, programas y proyectos, manejo directo de bienes, dineros o valores del Estado, administración de justicia o facultades administrativo sancionatorias, y los articulares que tengan a su cargo la dirección o manejo de recursos en los movimientos o partidos políticos. Estas funciones podrán ser ejercidas a través de ordenación de gasto, contratación pública, gerencia de proyectos de inversión, pagos, liquidaciones, administración de bienes muebles e inmuebles (…)La calidad de Personas Expuestas Políticamente (PEP) se mantendrá en el tiempo durante el ejercicio del cargo y por dos (2) años más desde la dejación, renuncia, despido o declaración de insubsistencia del nombramiento, o de cualquier otra forma de desvinculación, o terminación del contrato(…)”.',
          align: '',
          disabled: false
        },
        {
          type: TypeInputForm.ArrayGroup,
          visible: true,
          fixElements: true,
          disabled: false,
          startEmpty: true,
          data: 'informacion_personas_expuestas',
          required: true,
          children: [
            {
              label: 'Parent ID',
              visible: false,
              type: TypeInputForm.Text,
              size: 1,
              disabled: false,
              data: 'parent_id',
              required: false,
            },
            {
              label: 'Element ID',
              visible: false,
              type: TypeInputForm.Text,
              size: 1,
              disabled: false,
              data: 'id',
              required: true,
            },
            {
              label: 'Tipo ID',
              visible: true,
              type: TypeInputForm.SelectBox,
              size: 2,
              disabled: true,
              readonly: true,
              options_key: 'todos_tipo_id',
              data: 'f_document_parent_type_id',
              required: true,
            },
            {
              label: 'ID',
              visible: true,
              type: TypeInputForm.Text,
              size: 2,
              data: 'document_parent',
              required: true,
              disabled: true
            },
            {
              label: 'Nombre',
              visible: true,
              type: TypeInputForm.Text,
              size: 4,
              data: 'name_parent',
              required: true,
              disabled: true
            },
            {
              label: 'Entidad',
              visible: true,
              type: TypeInputForm.Text,
              size: 4,
              data: 'entity',
              required: true,
              disabled: false
            },
            {
              label: 'Cargo',
              visible: true,
              type: TypeInputForm.Text,
              size: 4,
              data: 'position',
              required: true,
              disabled: false
            },
            {
              label: 'Vinculación',
              visible: true,
              type: TypeInputForm.Date,
              size: 2,
              data: 'binding_date',
              required: true,
              disabled: false
            },
            {
              label: 'Desvinculación',
              visible: true,
              type: TypeInputForm.Date,
              size: 2,
              data: 'termination_date',
              required: true,
              disabled: false
            },
            {
              type: TypeInputForm.ArrayGroup,
              visible: true,
              addButonText: 'AGREGAR PARIENTE',
              data: 'people_relationships',
              required: true,
              disabled: false,
              children: [
                {
                  label: 'Tipo parentesco',
                  visible: true,
                  type: TypeInputForm.SelectBox,
                  size: 1,
                  options_key: 'parentesco',
                  data: 'f_vendor_relationship_id',
                  required: true,
                  disabled: false
                },
                {
                  label: 'Nombre',
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
                  dataDocumentType: 'f_document_type_id',
                  dataDocumentVerification: 'verification_digit',
                  dataDocumentPerson: 'f_person_type_id',
                  options_key_list: ['tipo_persona'],
                  required: true,
                  options_key: 'natural_id',
                  disabled: false
                },
              ]
            }
          ]
        },

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
          value: 'De manera voluntaria, obrando de buena fe y conforme a mi conocimiento actual declaro que:',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          value: 'De manera voluntaria, obrando de buena fe realizo las siguiente declaraciones:',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          value: 'i) Todo lo aquí consignado es cierto, veraz, correcto, exacto, actualizado, completo y comprobable, admitiendo que cualquier omisión o inexactitud en estos documentos podrá ocasionar el rechazo de esta y la devolución de la documentación, como también la cancelación de mi inscripción o registro. Que informaré cualquier circunstancia que modifique la presente declaración y que actualizaré los datos e información personal y financiera que sean requeridos cuando se solicite al menos una vez por año.',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          value: 'ii) Mis ingresos o bienes o los de la persona jurídica que represento o los de sus representantes legales, miembros de junta directiva, empleados de cumplimiento, revisores fiscales, auditores externos, accionista y/o socios con participación igual o superior al cinco por ciento (5%) y beneficiarios finales, no provienen de ninguna actividad ilícita o actividad LA/FT/FPADM/C/ST/F contemplada en el Código Penal Colombiano o en cualquier norma que lo sustituya, adicione o modifique. En consecuencia, declaro que los ingresos o bienes están ligados al desarrollo normal de actividades lícitas propias del objeto social en el caso de personas jurídicas o del ejercicio de profesión u oficio en el caso de personas naturales.',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          value: 'iii) Como persona natural o que la persona jurídica que represento, sus representante legales, miembros de junta directiva, empleados de cumplimiento, revisores fiscales, auditores externos, accionista y/o socios con participación igual o superior al cinco por ciento (5%) y beneficiarios finales no han efectuado transacciones u operaciones destinadas a la realización o financiamiento de actividades ilícitas o LA/FT/FPADM/C/ST/F contempladas en el Código Penal Colombiano o en cualquier norma que lo sustituya, adicione, o modifique, o a favor de personas relacionadas con dichas actividades.',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          value: 'iv) Como persona natural o que la persona jurídica que represento, sus representante legales, miembros de junta directiva, empleados de cumplimiento, revisores fiscales, auditores externos, accionista y/o socios con participación igual o superior al cinco por ciento (5%) y beneficiarios finales, no se encuentran en listas vinculantes para Colombia de conformidad con el derecho internacional (listas de las Naciones Unidas) o en la lista emitida por la Oficina de Activos Extranjeros del Departamento del Tesoro de los Estados Unidos (Lista OFAC), o en la lista de organizaciones terroristas emitida por el Consejo de Seguridad Nacional, así como en listas o bases de datos nacionales o internacionales relacionadas con actividades ilícitas, Fraude, Corrupción o Soborno (listas del Banco Mundial y del Banco Interamericano de Desarrollo), estando TIS autorizada o sus empresas relacionadas facultadas a efectuar las verificaciones que considere pertinentes en bases de datos, listas de control, o informaciones públicas nacionales o internacionales incluso mediante el uso de terceros, quienes pueden transferir y procesar dicha información, con el propósito de su verificación.',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          value: 'v) No existe en mi contra o contra la persona jurídica que represento, ni en contra de sus representante legales, miembros de junta directiva, empleados de cumplimiento, revisores fiscales, auditores externos, accionista y/o socios con participación igual o superior al cinco por ciento (5%) y beneficiarios finales una sentencia judicial en firme por la comisión de delitos dolosos relacionados con Lavado de Activos, Financiación del Terrorismo; Fraude, Corrupción o Soborno; o Soborno Transnacional; o que se encuentren vinculados a investigaciones penales por delitos dolosos relacionados con Lavado de Activos, Financiación del Terrorismo, Fraude, Corrupción o Soborno; o Soborno Transnacional estando TIS facultada para efectuar las verificaciones que considere pertinentes en bases de datos y en informaciones públicas nacionales o internacionales para gestionar el riesgo legal o reputacional.',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          value: 'vi) dando cumplimiento a las disposiciones de la ley 1581 de 2012, sus decretos reglamentarios y demás normas que lo sustituyan o modifiquen, por lo cual se dictan normas generales para la protección de datos personales y teniendo en cuenta que dicha ley tiene por objeto desarrollar el derecho constitucional que tienen las personas a conocer, actualizar y rectificar la información que se haya recogido sobre ellas en bases de datos o archivos. Declaro que conozco que TIS hace entrega del presente documento con el objetivo que sea autorizado el tratamiento de la información aquí depositada, autorizo y acepto expresamente que TIS, realice el tratamiento de los datos personales proporcionados en este formulario, de acuerdo a las políticas de tratamiento de datos publicadas en https://www.tisproductions.com/ con el fin de: creación y/o actualización de información de la contraparte, cumplir obligaciones relacionadas con prevención de los riesgos LA/FT/ FPADM/C/ST/F, formalización, consultas en listas, celebración y ejecución de contratos, y demás finaliddes señaladas en sus políticas de tratamiento. "',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          value: 'vii)',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          value: 'a. Como persona natural o que la persona jurídica que represento, sus representante legales, miembros de junta directiva, empleados de cumplimiento, revisores fiscales, auditores externos, accionista y/o socios con participación igual o superior al cinco por ciento (5%) y beneficiarios finales, a la fecha de firma de este formulario, no tienen conflictos de intereses, y no poseen información que actualmente implique o que eventualmente pueda configurar una situación de conflicto de Intereses con TIS, de la siguiente manera: - Ninguno de los anteriomente mencionados tienen relación de parentesco dentro del tercer grado de consanguinidad, primero de afinidad o primero civil, con algún empleado, directivo, administrador o accionista de TIS. - Ninguno de los anteriormente mencionados han sido parte ni son parte, en proceso judicial, administrativo, disciplinario o arbitral alguno o de cualquier otra índole, en el cual TIS, sus empleados, directivos, administradores o accionistas también sean parte, bien sea en su calidad de demandantes, demandados o llamados en garantía. - No conozco cualquier otra situación que pueda generar una situación de conflicto de Intereses con TIS. además reconozco y acepto mi obligación de informar a TIS, cualquier situación que pueda configurar un conflicto de Intereses con posterioridad a la fecha de firma del presente formulario."',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          value: 'b. Declaro los siguientes conflictos de intereses:',
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
          value: 'viii)',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          value: 'a. Algún tipo de vinculo con entidades estatales o de gobierno',
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
          value: 'b. Tiene familiares con algún vinculo con entidades estatales o de gobierno.',
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
          value: 'Por favor adjunte los siguientes archivos en formato PDF.',
          align: '',
          disabled: false
        },
        {
          type: TypeInputForm.File,
          label: 'Cédula de ciudadanía o documento válido de identificación',
          visible: true,
          size: 8,
          data: 'cedula_file',
          required: true,
          disabled: false
        },
        {
          type: TypeInputForm.File,
          label: 'Certificado de Existencia y Representación Legal con fecha de expedición inferior a un mes o su equivalente',
          visible: true,
          size: 8,
          data: 'certificado_existencia_file',
          required: true,
          disabled: false
        },
        {
          type: TypeInputForm.File,
          label: 'Cédula de ciudadanía o documento válido de identificación del representante legal',
          visible: true,
          size: 8,
          data: 'cedula_representante_legal_file',
          required: true,
          disabled: false
        },
        {
          type: TypeInputForm.File,
          label: 'Registro Único Tributario - RUT',
          visible: true,
          size: 8,
          data: 'rut_file',
          required: true,
          disabled: false
        },
        {
          type: TypeInputForm.File,
          label: 'Certificación Bancaria con fecha de expedición inferior a un mes',
          visible: true,
          size: 8,
          data: 'certificacion_bancaria_file',
          required: true,
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          value: 'Descargue aquí el Formulario de Declaración de Cumplimiento de Políticas, Autorización de Tratamiento de Datos Personales y Autorización de Consulta y Reporte de TIS. Por favor fírmelo y luego súbalo.',
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
