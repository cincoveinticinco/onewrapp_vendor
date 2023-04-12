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
  INFORMACION_PERSONAS_EXPUESTAS = 'informacion_personas_expuestas',
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
          data: 'tipo_persona',
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
          label: 'Folio',
          visible: true,
          type: TypeInputForm.Text,
          size: 1,
          data: 'folio',
          disabled: false
        },
        /*{
          label: 'DV',
          visible: true,
          type: TypeInputForm.Text,
          size: 1,
          data: 'verification_digit',
          disabled: false
        },*/
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
          data: 'nombre_razon_social',
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
          data: 'direccion_complemento',
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
          label: 'Estado',
          visible: true,
          type: TypeInputForm.Text,
          size: 2,
          data: 'estado',
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
        /*{
          label: 'Código postal',
          visible: true,
          type: TypeInputForm.Text,
          size: 2,
          data: 'postal_code',
          disabled: false
        },*/
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
        /*{
          label: 'PEP',
          visible: true,
          type: TypeInputForm.Text,
          size: 2,
          data: 'pep',
          disabled: false
        },
        {
          label: 'CIIU Principal',
          visible: true,
          type: TypeInputForm.SelectBox,
          size: 3,
          data: 'ciiu',
          options_key: 'ciiu',
          searching: false,
          disabled: false
        },*/
        {
          label: 'Actividad economica',
          visible: true,
          type: TypeInputForm.Text,
          size: 3,
          data: 'actividad_economica',
          disabled: false
        },
        {
          label: '¿Pertenece a un grupo empresarial?',
          visible: true,
          type: TypeInputForm.ChooseOption,
          size: 8,
          data: 'pertenece_grupo_empresarial',
          disabled: false
        },
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'Indicar las empresas que lo conforman y la calidad que ostentan dentro del grupo, esto es, si es matriz (M), filial (F) o subsidiaria (S):',
          align: 'center',
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
              type: TypeInputForm.Text,
              size: 2,
              data: 'numero_id',
              disabled: false
            },
            {
              label: 'Calidad',
              visible: true,
              type: TypeInputForm.Text,
              size: 1,
              data: 'calidad',
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
            data: 'nombres',
            disabled: false
          },
          {
            label: 'Apellidos',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            data: 'apellidos',
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
            type: TypeInputForm.Text,
            size: 3,
            data: 'numero_id',
            disabled: false
          },
          {
            label: 'Fecha expedición ID',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            data: 'fecha_expedicion',
            disabled: false
          },
          {
            label: 'Pais Domicilio',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            data: 'pais_domicilio',
            disabled: false
          },
          {
            label: 'Estado',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            data: 'estado_domicilio',
            disabled: false
          },
          {
            label: 'Ciudad',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            data: 'ciudad_domicilio',
            disabled: false
          },
          {
            label: 'Correo electrónico',
            visible: true,
            type: TypeInputForm.Text,
            size: 4,
            data: 'correo_electronico',
            break: true,
            disabled: false
          },
          /*{
            label: '¿Es una persona expuesta políticamente (PEP)?',
            visible: true,
            type: TypeInputForm.ChooseOption,
            size: 12,
            data: 'persona_pep',
            disabled: false
          },*/
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
            data: 'nombres'
          },
          {
            label: 'Apellidos',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            disabled: false,
            data: 'apellidos'
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
            type: TypeInputForm.Text,
            size: 3,
            disabled: false,
            data: 'numero_id',
          },
          {
            label: 'Fecha expedición ID',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            disabled: false,
            data: 'fecha_expedicion',
          },
          {
            label: 'Pais Domicilio',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            disabled: false,
            data: 'pais_domicilio',
          },
          {
            label: 'Estado',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            disabled: false,
            data: 'estado_domicilio',
          },
          {
            label: 'Ciudad',
            visible: true,
            type: TypeInputForm.Text,
            size: 2,
            disabled: false,
            data: 'ciudad_domicilio',
          },
          {
            label: 'Correo electrónico',
            visible: true,
            type: TypeInputForm.Text,
            size: 4,
            disabled: false,
            data: 'correo_electronico',
            break: true
          },
          /*{
            label: '¿Es una persona expuesta políticamente (PEP)?',
            visible: true,
            type: TypeInputForm.ChooseOption,
            size: 12,
            disabled: false,
            data: 'persona_pep',
          },*/
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
          content: 'Personas físicas y morales con participación igual o superior al cinco por ciento (5%)',
          disabled: false,
          data: 'informacion_accionistas',
          align: 'center'
        },
        {
          type: TypeInputForm.ArrayGroup,
          visible: true,
          addButonText: 'AGREGAR OTRO',
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
              size: 4,
              disabled: false,
              data: 'apellidos'
            },
            {
              label: '% Participación',
              visible: true,
              type: TypeInputForm.Text,
              size: 2,
              disabled: false,
              data: 'tipo_id',
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
              size: 2,
              disabled: false,
              data: 'fecha_expedicion',
            },
            {
              label: 'Pais Domicilio',
              visible: true,
              type: TypeInputForm.Text,
              size: 2,
              disabled: false,
              data: 'pais_domicilio',
            },
            {
              label: '¿Es una persona expuesta políticamente (PEP)?',
              visible: true,
              type: TypeInputForm.ChooseOption,
              size: 12,
              disabled: false,
              data: 'persona_pep',
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
          content: 'Si alguno de los accionistas y/o socios con participación superior o igual al cinco por ciento (5%) es una persona moral, indicar en el presente capitulo la información de la persona o personas físicas (Beneficiario Final). Se considerará Beneficiario Final: 1) Persona física que, actuando individual o conjuntamente, sea titular, directa o indirectamente, del cinco por ciento (5%), o más del capital o los derechos de voto de la persona moral y/o se beneficie en cinco por ciento (5%), o más de los activos, rendimientos o utilidades de la persona moral; y 2) Persona física que, actuando individual o conjuntamente, ejerza control sobre la persona moral, por cualquier otro medio diferente a los establecidos en el numeral anterior.',
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
                  data: 'persona_pep',
                },
              ]
            }
          ]
        }
      ]
    },
  /*  {
      key: 'informacion_personas_expuestas',
      title: 'PERSONAS EXPUESTAS POLÍTICAMENTE',
      visible: true,
      inputs: [
        {
          type: TypeInputForm.Paragraph,
          visible: true,
          content: 'Diligenciar la información de las personas que indicó, en apartados anteriores, ostentan la calidad de PEP “(…) Se considerarán como Personas Expuestas Políticamente (PEP) los servidores públicos de cualquier sistema de nomenclatura y clasificación de empleos de la administración pública nacional y territorial, cuando tengan asignadas o delegadas funciones de: expedición de normas o regulaciones, dirección general, formulación de políticas institucionales y adopción de planes, programas y proyectos, manejo directo de bienes, dineros o valores del Estado, administración de justicia o facultades administrativo sancionatorias, y los articulares que tengan a su cargo la dirección o manejo de recursos en los movimientos o partidos políticos. Estas funciones podrán ser ejercidas a través de ordenación de gasto, contratación pública, gerencia de proyectos de inversión, pagos, liquidaciones, administración de bienes muebles e inmuebles (…)La calidad de Personas Expuestas Políticamente (PEP) se mantendrá en el tiempo durante el ejercicio del cargo y por dos (2) años más desde la dejación, renuncia, despido o declaración de insubsistencia del nombramiento, o de cualquier otra forma de desvinculación, o terminación del contrato(…)”.',
          align: 'center',
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
    },*/
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
          content: 'vii)  a. Como persona física o que la persona moral que represento, sus representante legales, miembros de junta directiva, empleados de cumplimiento, revisores fiscales, auditores externos, accionista y/o socios y beneficiarios finales, a la fecha de firma de este formulario, no tienen conflictos de intereses, y no poseen información que actualmente implique o que eventualmente pueda configurar una situación de conflicto de intereses con TIS, de la siguiente manera: - Ninguno de los anteriomente mencionados tienen relación de parentesco dentro del tercer grado de consanguinidad, primero de afinidad o primero civil, con algún empleado, directivo, administrador o accionista de TIS. - Ninguno de los anteriormente mencionados han sido parte ni son parte, en proceso judicial, administrativo, disciplinario o arbitral alguno o de cualquier otra índole, en el cual TIS, sus empleados, directivos, administradores o accionistas también sean parte, bien sea en su calidad de demandantes, demandados o llamados en garantía. - No conozco cualquier otra situación que pueda generar una situación de conflicto de intereses con TIS, además reconozco y acepto mi obligación de informar a TIS, cualquier situación que pueda configurar un conflicto de intereses con posterioridad a la fecha de firma del presente formulario.',
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
          data: 'servicios_actividades',
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
          align: 'center',
          disabled: false
        },
        {
          type: TypeInputForm.File,
          label: 'Identificación oficial de la persona física o apoderado de persona moral (persona física y moral)',
          visible: true,
          data: 'identificacion_oficial_file',
          disabled: false
        },
        {
          type: TypeInputForm.File,
          label: 'Copia de la inscripción al Registro Federal de Contribuyentes (persona física y moral).',
          visible: true,
          data: 'inscripcion_registro_fed_file',
          disabled: false
        },
        {
          type: TypeInputForm.File,
          label: 'Constancia de cumplimiento de obligaciones fiscales (32D) con fecha de emisión no mayor a 1 mes (persona física y moral).',
          visible: true,
          data: 'cumplimiento_obligaciones_file',
          disabled: false
        },
        {
          type: TypeInputForm.File,
          label: 'Acta constitutiva y poder notarial (persona moral)',
          visible: true,
          data: 'acta_constitutiva_file',
          disabled: false
        },
        {
          type: TypeInputForm.File,
          label: 'Estado de cuenta bancario con fecha de emisión no mayor a 1 mes (persona física y moral).',
          visible: true,
          data: 'certificacion_bancaria_file',
          disabled: false
        },
        {
          type: TypeInputForm.File,
          label: 'Comprobante de domicilio, con fecha de emisión no mayor a 1 mes (persona física y moral).',
          visible: true,
          data: 'comprobante_domicilio_file',
          disabled: false
        },
    ]
    }
  ]
}
