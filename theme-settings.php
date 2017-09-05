<?php
/**
 * Implementation of hook_form_system_theme_settings_alter()
 *
 * @param $form
 *   Nested array of form elements that comprise the form.
 *
 * @param $form_state
 *   A keyed array containing the current state of the form.
 */

function bajapsa_form_system_theme_settings_alter(&$form, &$form_state) {
  $form['bajapsa_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('BAJapsa Settings'),
    '#collapsible' => FALSE,
    '#collapsed' => FALSE,
  );
  $form['bajapsa_settings']['show_breadcrumbs'] = array(
    '#type' => 'checkbox',
    '#title' => t('Show breadcrumbs in a page'),
    '#default_value' => theme_get_setting('show_breadcrumbs','bajapsa'),
    '#description'   => t("Check this option to show breadcrumbs in page. Uncheck to hide."),
  );
}
