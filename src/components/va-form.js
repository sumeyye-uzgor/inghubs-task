import {LitElement, html, css} from 'lit';
import './va-button.js';
import './va-text-field.js';
import './va-date-picker.js';
import './va-email.js';
import './va-select.js';
import './va-phone-input.js';
import {updateWhenLocaleChanges, msg} from '@lit/localize';
import {resetFormErrors, selectFormValidity} from '../store/form-slice';
import {store} from '../store/store.js';
import {addEmployee, updateEmployee} from '../store/employee-slice.js';
import {openModal} from '../store/modal-slice.js';

function generateShortNumericUUID() {
  return Date.now() + Math.floor(Math.random() * 100000);
}

export class VaForm extends LitElement {
  static get styles() {
    return css`
      .form-wrapper {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        justify-items: center;
        gap: 24px;
        background: white;
        padding: 32px;
        border-radius: 12px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
      }
      @media screen and (min-width: 600px) {
        .form-wrapper {
          grid-template-columns: repeat(2, 1fr);
          margin-inline: 40px;
        }
      }
      @media screen and (min-width: 1000px) {
        .form-wrapper {
          grid-template-columns: repeat(3, 1fr);
          margin-inline: 40px;
        }
      }
      .button-wrapper {
        display: flex;
        gap: 16px;
        margin-top: 32px;
        justify-content: center;
      }
    `;
  }
  static properties = {
    isFormValid: {state: true},
    formValues: {state: true},
    employeeId: {type: String},
    initialData: {type: Object},
  };

  constructor() {
    super();
    this.isFormValid = false;
    this.formValues = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      dateOfEmployment: '',
      phone: '',
      email: '',
      position: '',
      department: '',
    };
    updateWhenLocaleChanges(this);
  }
  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = store.subscribe(() => {
      const newValidState = selectFormValidity(store.getState());
      if (newValidState !== this.isFormValid) {
        this.isFormValid = newValidState;
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe?.();
  }
  _resetFormValues(isSubmitReset) {
    if (this.initialData && !isSubmitReset) {
      this.formValues = this.initialData;
    } else {
      this.formValues = {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        dateOfEmployment: '',
        phone: '',
        email: '',
        position: '',
        department: '',
      };
    }
    this.requestUpdate();
  }

  willUpdate(changedProps) {
    if (changedProps.has('initialData') && this.initialData) {
      this.formValues = {...this.initialData};
    }
  }
  _updateField(field, value) {
    this.formValues = {
      ...this.formValues,
      [field]: value,
    };
  }
  render() {
    const positions = [
      {label: 'Expert', value: 'Expert'},
      {label: 'Junior', value: 'Junior'},
      {label: 'Manager', value: 'Manager'},
      {label: 'Director', value: 'Director'},
      {label: 'Senior', value: 'Senior'},
      {label: 'TeamLead', value: 'TeamLead'},
    ];
    const departments = [
      {label: 'Design', value: 'Design'},
      {label: 'Finance', value: 'Finance'},
      {label: 'HR', value: 'HR'},
      {label: 'IT', value: 'IT'},
      {label: 'Marketing', value: 'Marketing'},
    ];

    return html`
      <div class="form-wrapper">
        <va-text-field
          label=${msg('First Name')}
          name="firstName"
          .value=${this.formValues.firstName ?? this.editFormData.firstName}
          .onChange=${(e) => this._updateField('firstName', e.detail.value)}
        ></va-text-field>
        <va-text-field
          label=${msg('Last Name')}
          name="lastName"
          .value=${this.formValues.lastName ?? this.editFormData.lastName}
          .onChange=${(e) => this._updateField('lastName', e.detail.value)}
        ></va-text-field>
        <va-date-picker
          label=${msg('Date of Employment')}
          name="dateOfEmployment"
          .value=${this.formValues.dateOfEmployment}
          .onChange=${(e) =>
            this._updateField('dateOfEmployment', e.detail.value)}
        ></va-date-picker>
        <va-date-picker
          label=${msg('Date of Birth')}
          name="dateOfBirth"
          .value=${this.formValues.dateOfBirth}
          .onChange=${(e) => this._updateField('dateOfBirth', e.detail.value)}
        ></va-date-picker>
        <va-phone-input
          .value=${this.formValues.phone}
          name="phone"
          .onChange=${(e) => this._updateField('phone', e.detail.value)}
        ></va-phone-input>
        <va-email
          label=${msg('Email')}
          name="email"
          .value=${this.formValues.email}
          .onChange=${(e) => this._updateField('email', e.detail.value)}
        ></va-email>
        <va-select
          placeholder=${msg('Select Position')}
          label=${msg('Position')}
          .items=${positions}
          name="position"
          .value=${this.formValues.position}
          .onChange=${(e) => this._updateField('position', e.detail.value)}
        ></va-select>
        <va-select
          placeholder=${msg('Select Department')}
          label=${msg('Department')}
          .items=${departments}
          name="department"
          .value=${this.formValues.department}
          .onChange=${(e) => this._updateField('department', e.detail.value)}
        ></va-select>
      </div>

      <div class="button-wrapper">
        <va-button
          label=${msg('Save')}
          variant="primary"
          @click=${() => {
            if (this.isFormValid) {
              store.dispatch(
                this.employeeId
                  ? updateEmployee({id: this.employeeId, ...this.formValues})
                  : addEmployee({
                      id: generateShortNumericUUID(),
                      ...this.formValues,
                    })
              );
              this._resetFormValues(true);
              this.requestUpdate();
              store.dispatch(
                openModal({
                  title: msg('Successful'),
                  description: msg('Employee is Saved'),
                  isConfirmModal: false,
                })
              );
            } else {
              store.dispatch(
                openModal({
                  title: msg('Invalid Form'),
                  description: msg('You can not proceed, try again later'),
                  isConfirmModal: false,
                })
              );
            }
          }}
          ?disabled=${!this.isFormValid}
        ></va-button>
        <va-button
          label=${msg('Cancel')}
          variant="secondary"
          color="purple"
          @click=${() => {
            store.dispatch(resetFormErrors());
            this._resetFormValues();
            this.requestUpdate();
          }}
        ></va-button>
      </div>
    `;
  }
}

window.customElements.define('va-form', VaForm);
