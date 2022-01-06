/**
 * Build module bundles
 *
 * @param builder {object} The builder object
 * @param module {object} The module
 * @param distribution {object} Distribution specification
 * @param path {string} The build target path
 * @param uglifier {object} The uglifier
 * @param exports {Set<string>} The resources being exported
 * @returns {Promise<void>}
 */
module.exports = async function (builder, module, distribution, path, uglifier, exports) {
    'use strict';

    const {bundles} = global;
    await bundles.ready;

    for (const bundle of module.bundles.values()) {
        await bundle.ready;
        if (!!bundles.get(bundle.name).Transversal) continue;

        builder.emit('message', `  . Building bundle ${bundle.name}`);

        const build = async language => {
            await require('./bundle')(path, module, bundle, distribution, language, uglifier, builder, exports);
        };

        if (bundle.multilanguage) {
            const {application} = builder;
            const languages = application.languages.supported;
            for (const language of languages) {
                await build(language);
            }
        }
        else {
            await build();
        }
    }
}