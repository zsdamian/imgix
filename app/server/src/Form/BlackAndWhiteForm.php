<?php

namespace Imgix\Form;

use Imgix\Model\BlackAndWhiteDTO;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class BlackAndWhiteForm extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('file', FileType::class, [
                'required' => true,
            ])
            ->add('mode', ChoiceType::class, [
                'choices' => [0, 1]
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefault('data_class', BlackAndWhiteDTO::class);
        $resolver->setDefault('csrf_protection', false);
    }

    public function getBlockPrefix()
    {
        return 'blackAndWhite';
    }
}