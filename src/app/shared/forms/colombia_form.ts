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

export enum VENDORS_INFO_COLOMBIA{
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
          content: 'TIS PRODUCTIONS COLOMBIA SAS (en adelante “TIS”) está comprometida con el respeto a las leyes y los negocios responsables, por lo que el apoyo de nuestros clientes, proveedores, contratistas y contrapartes en el cumplimiento de este compromiso es fundamental. Apreciada contraparte el diligenciamiento del presente formulario nos permite realizar el proceso de conocimiento de contrapartes y debida diligencia, de acuerdo con la normativa legal vigente en materia de prevención de Lavado de Activos, Financiación del Terrorismo, Financiamiento de la Proliferación de Armas de Destrucción Masiva, Corrupción, Soborno Trasnacional o Fraude (en adelante “LA/FT/FPADM/C/ST/F”), donde exige que toda persona natural o jurídica que quiera tener o tenga algún tipo de vinculo con la Compañía debe suministrar los datos personales y empresariales que permitan tener una identificación, clara, transparente, confiable y total de la contraparte.'
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
          content: 'Personas naturales: firmar el documento  y estar acompañado de copia de los documentos requeridos en el punto VIII. ANEXOS.'
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          disabled: false,
          content: 'Personas jurídicas: el formulario debe ser firmado por el representante legal y estar acompañado de copia de los documentos requeridos en el punto VIII. ANEXOS. '
        },
        {
          label: 'Tipo de Solicitud',
          visible: true,
          type: TypeInputForm.Text,
          disabled: true,
          size: 3,
          data: 'tipo_solicitud'
        },
        {
          label: 'Fecha de Solicitud',
          visible: true,
          type: TypeInputForm.Date,
          disabled: true,
          size: 3,
          data: 'created_at'
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
          options_key: 'tipo_contraparte',
          disabled: false
        },
        {
          label: 'Tipo Persona',
          visible: true,
          type: TypeInputForm.SelectBox,
          size: 2,
          data: 'f_person_type_id',
          options_key: 'tipo_persona',
          disabled: false
        },
        {
          label: 'Tipo ID',
          visible: true,
          type: TypeInputForm.SelectBox,
          size: 1,
          data: 'f_document_type_id',
          options_key: 'tipo_id',
          disabled: false
        },
        {
          label: 'Número de ID',
          visible: true,
          type: TypeInputForm.Text,
          size: 2,
          data: 'document',
          disabled: false
        },
        {
          label: 'DV',
          visible: true,
          type: TypeInputForm.SelectBox,
          options_key: 'verification_digit',
          size: 1,
          data: 'verification_digit',
          disabled: false
        },
        {
          label: 'Fecha matrícula o expedición ID',
          visible: true,
          type: TypeInputForm.Date,
          size: 2,
          data: 'expedition_date',
          disabled: false
        },
        {
          label: 'Nombre o Razón Social',
          visible: true,
          type: TypeInputForm.Text,
          size: 8,
          data: 'name',
          disabled: false
        },
        {
          label: 'Dirección',
          visible: true,
          type: TypeInputForm.Text,
          size: 5,
          data: 'address',
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
          disabled: false
        },
        {
          label: 'Departamento',
          visible: true,
          type: TypeInputForm.Text,
          size: 2,
          data: 'department',
          disabled: false
        },
        {
          label: 'Ciudad',
          visible: true,
          type: TypeInputForm.Text,
          size: 2,
          data: 'city',
          disabled: false
        },
        {
          label: 'Código postal',
          visible: true,
          type: TypeInputForm.Text,
          size: 2,
          data: 'postal_code',
          disabled: false
        },
        {
          label: 'Teléfono',
          visible: true,
          type: TypeInputForm.Text,
          size: 2,
          data: 'telephone',
          disabled: false
        },
        {
          label: 'Correo electrónico',
          visible: true,
          type: TypeInputForm.Text,
          size: 3,
          data: 'email',
          disabled: false
        },
        {
          label: 'Pagina web',
          visible: true,
          type: TypeInputForm.Text,
          size: 3,
          data: 'web_site',
          disabled: false
        },
        {
          label: 'PEP',
          visible: true,
          type: TypeInputForm.Text,
          size: 1,
          data: 'pep',
          disabled: false
        },
        {
          label: 'CIIU Principal',
          visible: true,
          type: TypeInputForm.SelectBox,
          size: 2,
          data: 'f_vendor_economic_act_id',
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
          readonly: true,
          disabled: false
        },
        {
          label: '¿Pertenece a un grupo empresarial?',
          visible: true,
          type: TypeInputForm.ChooseOption,
          size: 8,
          data: 'business_group',
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
          disabled: false,
          children: [
            {
              label: 'Nombre o Razón Social',
              visible: true,
              type: TypeInputForm.Text,
              size: 4,
              data: 'name',
              disabled: false
            },
            {
              label: 'Tipo ID',
              visible: true,
              type: TypeInputForm.SelectBox,
              size: 1,
              data: 'f_document_type_id',
              options_key: 'juridica_id',
              disabled: false
            },
            {
              label: 'Número de ID',
              visible: true,
              type: TypeInputForm.Text,
              size: 2,
              data: 'document',
              disabled: false
            },
            {
              label: 'Calidad',
              visible: true,
              type: TypeInputForm.SelectBox,
              size: 1,
              data: 'quantity',
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
      visible: true,
      inputs: [{
        type: TypeInputForm.ArrayGroup,
        visible: true,
        data: 'informacion_representantes_legales',
        addButonText: 'AGREGAR REPRESENTANTE',
        disabled: false,
        children: [
          {
            label: 'Nombres',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            data: 'name',
            disabled: false
          },
          {
            label: 'Apellidos',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            data: 'last_name',
            disabled: false
          },
          {
            label: 'Tipo ID',
            visible: true,
            type: TypeInputForm.SelectBox,
            size: 1,
            data: 'f_document_type_id',
            options_key: 'natural_id',
            disabled: false
          },
          {
            label: 'Número de ID',
            visible: true,
            type: TypeInputForm.Text,
            size: 3,
            data: 'document',
            disabled: false
          },
          {
            label: 'Fecha expedición ID',
            visible: true,
            type: TypeInputForm.Date,
            size: 2,
            data: 'expedition_date',
            disabled: false
          },
          {
            label: 'Pais Domicilio',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            data: 'country',
            disabled: false
          },
          {
            label: 'Departamento',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            data: 'department',
            disabled: false
          },
          {
            label: 'Ciudad',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            data: 'city',
            disabled: false
          },
          {
            label: 'Correo electrónico',
            visible: true,
            type: TypeInputForm.Text,
            size: 4,
            data: 'email',
            break: true,
            disabled: false
          },
          {
            label: '¿Es una persona expuesta políticamente (PEP)?',
            visible: true,
            type: TypeInputForm.ChooseOption,
            size: 12,
            data: 'informacion_representantes_legales_pep',
            disabled: false
          },
        ]
      }
    ]
    },
    {
      key: 'informacion_junta_directiva',
      title: 'INFORMACIÓN JUNTA DIRECTIVA, CONSEJO DE ADMINISTRACIÓN O EQUIVALENTE',
      visible: true,
      inputs: [{
        type: TypeInputForm.ArrayGroup,
        visible: true,
        addButonText: 'AGREGAR MIEMBRO',
        disabled: false,
        data: 'informacion_junta_directiva',
        children: [
          {
            label: 'Nombres',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            disabled: false,
            data: 'name'
          },
          {
            label: 'Apellidos',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            disabled: false,
            data: 'last_name'
          },
          {
            label: 'Tipo ID',
            visible: true,
            type: TypeInputForm.SelectBox,
            size: 1,
            disabled: false,
            options_key: 'natural_id',
            data: 'f_document_type_id',
          },
          {
            label: 'Número de ID',
            visible: true,
            type: TypeInputForm.Text,
            size: 3,
            disabled: false,
            data: 'document',
          },
          {
            label: 'Fecha expedición ID',
            visible: true,
            type: TypeInputForm.Date,
            size: 2,
            disabled: false,
            data: 'expedition_date',
          },
          {
            label: 'Pais Domicilio',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            disabled: false,
            data: 'country',
          },
          {
            label: 'Departamento',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            disabled: false,
            data: 'department',
          },
          {
            label: 'Ciudad',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            disabled: false,
            data: 'city',
          },
          {
            label: 'Correo electrónico',
            visible: true,
            type: TypeInputForm.Text,
            size: 4,
            disabled: false,
            data: 'email',
            break: true
          },
          {
            label: '¿Es una persona expuesta políticamente (PEP)?',
            visible: true,
            type: TypeInputForm.ChooseOption,
            size: 12,
            disabled: false,
            data: 'informacion_junta_directiva_pep',
          },
        ]
      }
    ]
    },
    {
      key: 'informacion_accionistas',
      title: 'INFORMACIÓN ACCIONISTAS Y/O SOCIOS',
      visible: true,
      inputs: [
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'Personas naturales o jurídicas con participación igual o superior al cinco por ciento (5%)”',
          disabled: false,
          data: 'informacion_accionistas',
          align: ''
        },
        {
          type: TypeInputForm.ArrayGroup,
          visible: true,
          addButonText: 'AGREGAR OTRO',
          disabled: false,
          data: 'informacion_accionistas',
          children: [
            {
              label: 'Tipo persona',
              visible: true,
              type: TypeInputForm.SelectBox,
              size: 2,
              disabled: false,
              data: 'f_person_type_id',
              options_key: 'tipo_persona',
            },
            {
              label: 'Nombre o Razón Social',
              visible: true,
              type: TypeInputForm.Text,
              size: 4,
              disabled: false,
              data: 'name'
            },
            {
              label: '% Participación',
              visible: true,
              type: TypeInputForm.Text,
              size: 2,
              disabled: false,
              data: 'percente_participation',
            },
            {
              label: 'Tipo ID',
              visible: true,
              type: TypeInputForm.SelectBox,
              size: 1,
              disabled: false,
              options_key: 'todos_tipo_id',
              data: 'f_document_type_id',
            },
            {
              label: 'Número de ID',
              visible: true,
              type: TypeInputForm.Text,
              size: 2,
              disabled: false,
              data: 'document',
            },
            {
              label: 'DV',
              visible: true,
              type: TypeInputForm.SelectBox,
              size: 1,
              disabled: false,
              options_key: 'verification_digit',
              data: 'verification_digit',
            },
            {
              label: 'Fecha matrícula o expedición ID',
              visible: true,
              type: TypeInputForm.Date,
              size: 2,
              disabled: false,
              data: 'expedition_date',
            },
            {
              label: 'Pais Domicilio',
              visible: true,
              type: TypeInputForm.Text,
              size: 2,
              disabled: false,
              data: 'country',
            },
            {
              label: '¿Es una persona expuesta políticamente (PEP)?',
              visible: true,
              type: TypeInputForm.ChooseOption,
              size: 12,
              disabled: false,
              data: 'informacion_accionistas_pep',
            },
          ]
        }
      ]
    },
    {
      key: 'informacion_beneficiarios_finales',
      title: 'INFORMACIÓN COMPLEMENTARIA DE BENEFICIARIOS FINALES',
      visible: true,
      inputs: [
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'Si alguno de los accionistas y/o socios con participación superior o igual al cinco por ciento (5%) es una persona jurídica, indicar en el presente capitulo la información de la persona o personas naturales Beneficiario Final. Se considerará Beneficiario Final: 1) Persona natural que, actuando individual o conjuntamente, sea titular, directa o indirectamente, del cinco por ciento (5%), o más del capital o los derechos de voto de la persona jurídica, y/o se beneficie en cinco por ciento (5%), o más de los activos, rendimientos o utilidades de la persona jurídica; y 2) Persona natural que, actuando individual o conjuntamente, ejerza control sobre la persona jurídica, por cualquier otro medio diferente a los establecidos en el numeral anterior',
          disabled: false,
          data: 'informacion_beneficiarios_finales',
          align: ''
        },
        {
          type: TypeInputForm.ArrayGroup,
          visible: true,
          fixElements: true,
          disabled: false,
          children: [
            {
              label: 'ID',
              visible: true,
              type: TypeInputForm.Text,
              size: 2,
              data: 'id',
              disabled: true
            },
            {
              label: 'Razón Social',
              visible: true,
              type: TypeInputForm.Text,
              size: 6,
              data: 'razon_social',
              disabled: true
            },
            {
              type: TypeInputForm.ArrayGroup,
              visible: true,
              addButonText: 'AGREGAR BENIFICIARIO',
              disabled: false,
              children: [
                {
                  label: 'Tipo persona',
                  visible: true,
                  type: TypeInputForm.SelectBox,
                  size: 2,
                  disabled: false,
                  data: 'tipo_persona'
                },
                {
                  label: 'Nombre o Razón Social',
                  visible: true,
                  type: TypeInputForm.Text,
                  size: 6,
                  disabled: false,
                  data: 'razon_social'
                },
                {
                  label: 'Tipo ID',
                  visible: true,
                  type: TypeInputForm.SelectBox,
                  size: 1,
                  disabled: false,
                  data: 'tipo_id',
                },
                {
                  label: 'Número de ID',
                  visible: true,
                  type: TypeInputForm.SelectBox,
                  size: 2,
                  disabled: false,
                  data: 'numero_id',
                },
                {
                  label: 'DV',
                  visible: true,
                  type: TypeInputForm.SelectBox,
                  size: 1,
                  disabled: false,
                  data: 'dv',
                },
                {
                  label: 'Fecha matrícula o expedición ID',
                  visible: true,
                  type: TypeInputForm.Text,
                  size: 3,
                  disabled: false,
                  data: 'fecha_expedicion',
                },
                {
                  label: '¿Es una persona expuesta políticamente (PEP)?',
                  visible: true,
                  type: TypeInputForm.ChooseOption,
                  size: 12,
                  disabled: false,
                  data: 'info_beneficiarios_persona_pep',
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
      visible: true,
      inputs: [
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'Diligenciar la información de las personas que indicó, en apartados anteriores, ostentan la calidad de PEP “(…) Se considerarán como Personas Expuestas Políticamente (PEP) los servidores públicos de cualquier sistema de nomenclatura y clasificación de empleos de la administración pública nacional y territorial, cuando tengan asignadas o delegadas funciones de: expedición de normas o regulaciones, dirección general, formulación de políticas institucionales y adopción de planes, programas y proyectos, manejo directo de bienes, dineros o valores del Estado, administración de justicia o facultades administrativo sancionatorias, y los articulares que tengan a su cargo la dirección o manejo de recursos en los movimientos o partidos políticos. Estas funciones podrán ser ejercidas a través de ordenación de gasto, contratación pública, gerencia de proyectos de inversión, pagos, liquidaciones, administración de bienes muebles e inmuebles (…)La calidad de Personas Expuestas Políticamente (PEP) se mantendrá en el tiempo durante el ejercicio del cargo y por dos (2) años más desde la dejación, renuncia, despido o declaración de insubsistencia del nombramiento, o de cualquier otra forma de desvinculación, o terminación del contrato(…)”.',
          align: '',
          disabled: false
        },
        {
          type: TypeInputForm.ArrayGroup,
          visible: true,
          fixElements: true,
          disabled: false,
          data: 'informacion_personas_expuestas',
          children: [
            {
              label: 'ID',
              visible: true,
              type: TypeInputForm.Text,
              size: 2,
              data: 'id',
              disabled: true
            },
            {
              label: 'Nombre',
              visible: true,
              type: TypeInputForm.Text,
              size: 6,
              data: 'nomber',
              disabled: true
            },
            {
              label: 'Entidad',
              visible: true,
              type: TypeInputForm.Text,
              size: 4,
              data: 'entidad',
              disabled: false
            },
            {
              label: 'Cargo',
              visible: true,
              type: TypeInputForm.Text,
              size: 4,
              data: 'cargo',
              disabled: false
            },
            {
              label: 'Vinculación',
              visible: true,
              type: TypeInputForm.Text,
              size: 2,
              data: 'vinculacion',
              disabled: false
            },
            {
              label: 'Desvinculación',
              visible: true,
              type: TypeInputForm.Text,
              size: 2,
              data: 'desvinculacion',
              disabled: false
            },
            {
              type: TypeInputForm.ArrayGroup,
              visible: true,
              addButonText: 'AGREGAR BENIFICIARIO',
              disabled: false,
              children: [
                {
                  label: 'Tipo parentesco',
                  visible: true,
                  type: TypeInputForm.SelectBox,
                  size: 2,
                  data: 'tipo_persona',
                  disabled: false
                },
                {
                  label: 'Nombre',
                  visible: true,
                  type: TypeInputForm.Text,
                  size: 3,
                  data: 'razon_social',
                  disabled: false
                },
                {
                  label: 'Tipo ID',
                  visible: true,
                  type: TypeInputForm.SelectBox,
                  size: 1,
                  data: 'tipo_id',
                  disabled: false
                },
                {
                  label: 'Número de ID',
                  visible: true,
                  type: TypeInputForm.SelectBox,
                  size: 2,
                  data: 'numero_id',
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
      visible: true,
      inputs: [
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: '“De manera voluntaria, obrando de buena fe y conforme a mi conocimiento actual declaro que:',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'De manera voluntaria, obrando de buena fe realizo las siguiente declaraciones:”',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'i) Todo lo aquí consignado es cierto, veraz, correcto, exacto, actualizado, completo y comprobable, admitiendo que cualquier omisión o inexactitud en estos documentos podrá ocasionar el rechazo de esta y la devolución de la documentación, como también la cancelación de mi inscripción o registro. Que informaré cualquier circunstancia que modifique la presente declaración y que actualizaré los datos e información personal y financiera que sean requeridos cuando se solicite al menos una vez por año.',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'ii) Mis ingresos o bienes o los de la persona jurídica que represento o los de sus representantes legales, miembros de junta directiva, empleados de cumplimiento, revisores fiscales, auditores externos, accionista y/o socios con participación igual o superior al cinco por ciento (5%) y beneficiarios finales, no provienen de ninguna actividad ilícita o actividad LA/FT/FPADM/C/ST/F contemplada en el Código Penal Colombiano o en cualquier norma que lo sustituya, adicione o modifique. En consecuencia, declaro que los ingresos o bienes están ligados al desarrollo normal de actividades lícitas propias del objeto social en el caso de personas jurídicas o del ejercicio de profesión u oficio en el caso de personas naturales.',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'iii) Como persona natural o que la persona jurídica que represento, sus representante legales, miembros de junta directiva, empleados de cumplimiento, revisores fiscales, auditores externos, accionista y/o socios con participación igual o superior al cinco por ciento (5%) y beneficiarios finales no han efectuado transacciones u operaciones destinadas a la realización o financiamiento de actividades ilícitas o LA/FT/FPADM/C/ST/F contempladas en el Código Penal Colombiano o en cualquier norma que lo sustituya, adicione, o modifique, o a favor de personas relacionadas con dichas actividades.',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'iv) Como persona natural o que la persona jurídica que represento, sus representante legales, miembros de junta directiva, empleados de cumplimiento, revisores fiscales, auditores externos, accionista y/o socios con participación igual o superior al cinco por ciento (5%) y beneficiarios finales, no se encuentran en listas vinculantes para Colombia de conformidad con el derecho internacional (listas de las Naciones Unidas) o en la lista emitida por la Oficina de Activos Extranjeros del Departamento del Tesoro de los Estados Unidos (Lista OFAC), o en la lista de organizaciones terroristas emitida por el Consejo de Seguridad Nacional, así como en listas o bases de datos nacionales o internacionales relacionadas con actividades ilícitas, Fraude, Corrupción o Soborno (listas del Banco Mundial y del Banco Interamericano de Desarrollo), estando TIS autorizada o sus empresas relacionadas facultadas a efectuar las verificaciones que considere pertinentes en bases de datos, listas de control, o informaciones públicas nacionales o internacionales incluso mediante el uso de terceros, quienes pueden transferir y procesar dicha información, con el propósito de su verificación.',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'v) No existe en mi contra o contra la persona jurídica que represento, ni en contra de sus representante legales, miembros de junta directiva, empleados de cumplimiento, revisores fiscales, auditores externos, accionista y/o socios con participación igual o superior al cinco por ciento (5%) y beneficiarios finales una sentencia judicial en firme por la comisión de delitos dolosos relacionados con Lavado de Activos, Financiación del Terrorismo; Fraude, Corrupción o Soborno; o Soborno Transnacional; o que se encuentren vinculados a investigaciones penales por delitos dolosos relacionados con Lavado de Activos, Financiación del Terrorismo, Fraude, Corrupción o Soborno; o Soborno Transnacional estando TIS facultada para efectuar las verificaciones que considere pertinentes en bases de datos y en informaciones públicas nacionales o internacionales para gestionar el riesgo legal o reputacional.',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'vi) dando cumplimiento a las disposiciones de la ley 1581 de 2012, sus decretos reglamentarios y demás normas que lo sustituyan o modifiquen, por lo cual se dictan normas generales para la protección de datos personales y teniendo en cuenta que dicha ley tiene por objeto desarrollar el derecho constitucional que tienen las personas a conocer, actualizar y rectificar la información que se haya recogido sobre ellas en bases de datos o archivos. Declaro que conozco que TIS hace entrega del presente documento con el objetivo que sea autorizado el tratamiento de la información aquí depositada, autorizo y acepto expresamente que TIS, realice el tratamiento de los datos personales proporcionados en este formulario, de acuerdo a las políticas de tratamiento de datos publicadas en https://www.tisproductions.com/ con el fin de: creación y/o actualización de información de la contraparte, cumplir obligaciones relacionadas con prevención de los riesgos LA/FT/ FPADM/C/ST/F, formalización, consultas en listas, celebración y ejecución de contratos, y demás finaliddes señaladas en sus políticas de tratamiento. "',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'vii) a. Como persona natural o que la persona jurídica que represento, sus representante legales, miembros de junta directiva, empleados de cumplimiento, revisores fiscales, auditores externos, accionista y/o socios con participación igual o superior al cinco por ciento (5%) y beneficiarios finales, a la fecha de firma de este formulario, no tienen conflictos de intereses, y no poseen información que actualmente implique o que eventualmente pueda configurar una situación de conflicto de Intereses con TIS, de la siguiente manera: - Ninguno de los anteriomente mencionados tienen relación de parentesco dentro del tercer grado de consanguinidad, primero de afinidad o primero civil, con algún empleado, directivo, administrador o accionista de TIS. - Ninguno de los anteriormente mencionados han sido parte ni son parte, en proceso judicial, administrativo, disciplinario o arbitral alguno o de cualquier otra índole, en el cual TIS, sus empleados, directivos, administradores o accionistas también sean parte, bien sea en su calidad de demandantes, demandados o llamados en garantía. - No conozco cualquier otra situación que pueda generar una situación de conflicto de Intereses con TIS. además reconozco y acepto mi obligación de informar a TIS, cualquier situación que pueda configurar un conflicto de Intereses con posterioridad a la fecha de firma del presente formulario."',
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
          disabled: false
        },
        {
          label: 'Describa cual',
          visible: true,
          type: TypeInputForm.Text,
          size: 7,
          data: 'desc_conflicto_intereses',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'viii) a. Algún tipo de vinculo con entidades estatales o de gobierno',
          disabled: false
        },
        {
          label: '',
          visible: true,
          type: TypeInputForm.ChooseOption,
          size: 1,
          data: 'vinculo_estatal',
          disabled: false
        },
        {
          label: 'Describa cual',
          visible: true,
          type: TypeInputForm.Text,
          size: 7,
          data: 'desc_vinculo_estatal',
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
          disabled: false
        },
        {
          label: 'Describa cual parentesco',
          visible: true,
          type: TypeInputForm.Text,
          size: 7,
          data: 'desc_vinculo_familiar_estatal',
          disabled: false
        },
      ]
    },
    {
      key: 'anexos',
      title: 'ANEXOS',
      visible: true,
      inputs: [
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'Por favor adjunte los siguientes archivos en formato PDF.',
          align: '',
          disabled: false
        },
        {
          type: TypeInputForm.File,
          label: 'Cédula de ciudadanía o documento válido de identificación',
          visible: true,
          data: 'cedula_file',
          disabled: false
        },
        {
          type: TypeInputForm.File,
          label: 'Certificado de Existencia y Representación Legal con fecha de expedición inferior a un mes o su equivalente',
          visible: true,
          data: 'certificado_existencia_file',
          disabled: false
        },
        {
          type: TypeInputForm.File,
          label: 'Cédula de ciudadanía o documento válido de identificación del representante legal',
          visible: true,
          data: 'cedula_representante_legal_file',
          disabled: false
        },
        {
          type: TypeInputForm.File,
          label: 'Registro Único Tributario - RUT',
          visible: true,
          data: 'rut_file',
          disabled: false
        },
        {
          type: TypeInputForm.File,
          label: 'Certificación Bancaria con fecha de expedición inferior a un mes',
          visible: true,
          data: 'certificacion_bancaria_file',
          disabled: false
        },
      ]
    }
  ]
}
