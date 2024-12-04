import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

const templateCache: Map<string, Handlebars.TemplateDelegate> = new Map();

export const compileTemplate = (templateName: string, data: Record<string, any>): string => {
  if (!templateCache.has(templateName)) {
    const templatePath = path.join(__dirname, '../templates', `${templateName}.hbs`);

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template not found: ${templatePath}`);
    }

    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = Handlebars.compile(templateContent);
    templateCache.set(templateName, compiledTemplate);
  }

  const template = templateCache.get(templateName)!;
  return template(data);
};
